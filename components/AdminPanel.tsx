"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";
import { RAZE } from "@/lib/config";

type BotStatus = {
  online: boolean;
  servers: number;
  users: number;
  voice_connections: number;
};

type Announcement = {
  id: string;
  message: string;
  active: boolean;
  created_at: string;
};

type FeatureFlag = {
  key: string;
  enabled: boolean;
  label: string;
};

export default function AdminPanel() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setChecking(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <main className="min-h-screen bg-void flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-ember flicker" />
      </main>
    );
  }

  if (!isSupabaseConfigured) {
    return <NotConfigured />;
  }

  if (!session) {
    return <LoginScreen />;
  }

  return <Dashboard email={session.user.email ?? ""} />;
}

function NotConfigured() {
  return (
    <main className="min-h-screen bg-void text-bone flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="font-display text-3xl mb-4">Admin panel not wired up yet</div>
        <p className="text-ash text-sm leading-relaxed mb-6">
          This page controls {RAZE.name}, but it needs a Supabase project connected
          before it can do anything. Add{" "}
          <code className="text-ember">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-ember">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> as
          environment variables in Vercel, run the SQL in{" "}
          <code className="text-ember">supabase/schema.sql</code>, then create
          yourself a user under Supabase &rarr; Authentication.
        </p>
      </div>
    </main>
  );
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <main className="min-h-screen bg-void text-bone flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-ember to-emberDim mb-4">
            <span className="text-bone font-display text-lg leading-none">R</span>
          </span>
          <h1 className="font-display text-2xl">Control panel</h1>
          <p className="text-ash text-sm mt-1">Sign in to manage {RAZE.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs text-ash mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-char/50 px-4 py-2.5 text-sm text-bone placeholder:text-ash/60 focus:border-ember/60 outline-none transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs text-ash mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/10 bg-char/50 px-4 py-2.5 text-sm text-bone placeholder:text-ash/60 focus:border-ember/60 outline-none transition-colors"
              placeholder="********"
            />
          </div>

          {error && (
            <p className="text-xs text-emberBright bg-emberDim/10 border border-emberDim/30 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-ember py-2.5 text-sm font-semibold text-bone hover:bg-emberBright transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in\u2026" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}

function Dashboard({ email }: { email: string }) {
  const [status, setStatus] = useState<BotStatus | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  async function loadAll() {
    const supabase = getSupabase();
    if (!supabase) return;
    setLoading(true);
    const [statusRes, annRes, flagRes] = await Promise.all([
      supabase.from("bot_status").select("*").eq("id", 1).single(),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("feature_flags").select("*").order("key"),
    ]);
    if (statusRes.data) setStatus(statusRes.data as BotStatus);
    if (annRes.data) setAnnouncements(annRes.data as Announcement[]);
    if (flagRes.data) setFlags(flagRes.data as FeatureFlag[]);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function toggleFlag(key: string, enabled: boolean) {
    const supabase = getSupabase();
    if (!supabase) return;
    setFlags((prev) => prev.map((f) => (f.key === key ? { ...f, enabled } : f)));
    await supabase.from("feature_flags").update({ enabled }).eq("key", key);
  }

  async function toggleOnline(online: boolean) {
    const supabase = getSupabase();
    if (!supabase) return;
    setStatus((prev) => (prev ? { ...prev, online } : prev));
    await supabase.from("bot_status").update({ online }).eq("id", 1);
  }

  async function postAnnouncement() {
    const supabase = getSupabase();
    if (!supabase || !newAnnouncement.trim()) return;
    const { data } = await supabase
      .from("announcements")
      .insert({ message: newAnnouncement.trim(), active: true })
      .select()
      .single();
    if (data) setAnnouncements((prev) => [data as Announcement, ...prev]);
    setNewAnnouncement("");
    setSaveMsg("Posted");
    setTimeout(() => setSaveMsg(null), 1500);
  }

  async function removeAnnouncement(id: string) {
    const supabase = getSupabase();
    if (!supabase) return;
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    await supabase.from("announcements").delete().eq("id", id);
  }

  async function signOut() {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
  }

  return (
    <main className="min-h-screen bg-void text-bone">
      <header className="border-b border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-5 flex items-center justify-between">
          <div>
            <div className="font-display text-xl">Control panel</div>
            <div className="text-xs text-ash mt-0.5">{email}</div>
          </div>
          <button
            onClick={signOut}
            className="text-sm text-ash hover:text-bone border border-white/10 rounded-md px-4 py-2 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
        {loading ? (
          <div className="text-ash text-sm">Loading&hellip;</div>
        ) : (
          <>
            {/* Bot status */}
            <section>
              <h2 className="font-display text-lg mb-4">Bot status</h2>
              <div className="border border-white/5 rounded-lg bg-char/30 p-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-bone font-medium mb-1">
                    {status?.online ? "Online" : "Offline"}
                  </div>
                  <div className="text-xs text-ash">
                    {status?.servers ?? 0} servers &bull; {status?.users ?? 0} users &bull;{" "}
                    {status?.voice_connections ?? 0} in voice
                  </div>
                </div>
                <button
                  onClick={() => toggleOnline(!status?.online)}
                  className={`rounded-md px-4 py-2 text-xs font-medium transition-colors ${
                    status?.online
                      ? "bg-emberDim/30 text-bone hover:bg-emberDim/50"
                      : "bg-ember text-bone hover:bg-emberBright"
                  }`}
                >
                  Mark {status?.online ? "offline" : "online"}
                </button>
              </div>
            </section>

            {/* Feature flags */}
            <section>
              <h2 className="font-display text-lg mb-4">Feature flags</h2>
              <div className="border border-white/5 rounded-lg bg-char/30 divide-y divide-white/5">
                {flags.map((f) => (
                  <div key={f.key} className="flex items-center justify-between px-6 py-4">
                    <span className="text-sm text-bone">{f.label ?? f.key}</span>
                    <button
                      role="switch"
                      aria-checked={f.enabled}
                      onClick={() => toggleFlag(f.key, !f.enabled)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        f.enabled ? "bg-ember" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-bone transition-transform ${
                          f.enabled ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
                {flags.length === 0 && (
                  <div className="px-6 py-4 text-sm text-ash">No feature flags yet.</div>
                )}
              </div>
            </section>

            {/* Announcements */}
            <section>
              <h2 className="font-display text-lg mb-4">Announcements</h2>
              <div className="flex gap-3 mb-4">
                <input
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="e.g. Raze Canary signups open soon…"
                  className="flex-1 rounded-md border border-white/10 bg-char/50 px-4 py-2.5 text-sm placeholder:text-ash/60 focus:border-ember/60 outline-none transition-colors"
                />
                <button
                  onClick={postAnnouncement}
                  className="rounded-md bg-ember px-5 py-2.5 text-sm font-medium text-bone hover:bg-emberBright transition-colors"
                >
                  Post
                </button>
              </div>
              {saveMsg && <p className="text-xs text-ash mb-3">{saveMsg}</p>}
              <div className="border border-white/5 rounded-lg bg-char/30 divide-y divide-white/5">
                {announcements.map((a) => (
                  <div key={a.id} className="flex items-center justify-between px-6 py-4 gap-4">
                    <span className="text-sm text-bone">{a.message}</span>
                    <button
                      onClick={() => removeAnnouncement(a.id)}
                      className="text-xs text-ash hover:text-emberBright transition-colors shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                {announcements.length === 0 && (
                  <div className="px-6 py-4 text-sm text-ash">No announcements posted.</div>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
