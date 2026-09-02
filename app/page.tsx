import Nav from "@/components/Nav";
import Embers from "@/components/Embers";
import { RAZE } from "@/lib/config";

const commands = [
  { cmd: "/play", desc: "Queue a track from YouTube, Spotify, or SoundCloud" },
  { cmd: "/filter", desc: "Apply a DSP filter — 8D, bass boost, nightcore, and more" },
  { cmd: "/queue", desc: "See what's lined up next" },
  { cmd: "/skip", desc: "Skip the current track" },
  { cmd: "/volume", desc: "Adjust playback volume up to 200%" },
  { cmd: "/247", desc: "Keep Raze in voice around the clock" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-void text-bone">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grain" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(220,38,38,0.18), transparent 70%)",
          }}
        />
        <Embers count={14} />

        <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emberDim/50 bg-char/60 px-4 py-1.5 text-xs text-ash mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-ember flicker" />
            Online now &mdash; free, forever
          </div>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] tracking-tight mb-6">
            {RAZE.name}
          </h1>

          <p className="text-xl sm:text-2xl text-bone/90 font-medium mb-4">
            {RAZE.tagline}
          </p>
          <p className="mx-auto max-w-xl text-base text-ash mb-10 leading-relaxed">
            {RAZE.subtagline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={RAZE.inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-ember px-7 py-3.5 text-sm font-semibold text-bone ember-glow hover:bg-emberBright transition-colors duration-150"
            >
              Add Raze to your server
            </a>
            <a
              href={RAZE.topGgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-white/10 px-7 py-3.5 text-sm font-medium text-bone hover:border-ember/50 hover:bg-char/40 transition-colors duration-150"
            >
              Vote on Top.gg
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-ash">
            <span>Lossless audio</span>
            <span className="text-emberDim">&bull;</span>
            <span>15+ DSP filters</span>
            <span className="text-emberDim">&bull;</span>
            <span>24/7 playback</span>
            <span className="text-emberDim">&bull;</span>
            <span>Zero cost</span>
          </div>
        </div>
      </section>

      <div className="scorch-line mx-auto max-w-6xl" />

      {/* COMMANDS */}
      <section id="commands" className="relative mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-lg mb-14">
          <h2 className="font-display text-3xl sm:text-4xl mb-3">Commands</h2>
          <p className="text-ash leading-relaxed">
            Everything Raze can do, right from Discord&apos;s slash-command menu. No prefixes to remember.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-px bg-white/5 rounded-lg overflow-hidden border border-white/5">
          {commands.map((c) => (
            <div key={c.cmd} className="bg-void p-6 hover:bg-char/60 transition-colors duration-150">
              <code className="text-ember font-mono text-sm">{c.cmd}</code>
              <p className="mt-2 text-sm text-ash leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="scorch-line mx-auto max-w-6xl" />

      {/* STATUS */}
      <section id="status" className="relative mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl sm:text-4xl mb-3">Status</h2>
        <p className="text-ash leading-relaxed mb-12 max-w-lg">
          Raze&apos;s current footprint. Numbers update as the bot grows.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "Status", value: "Online" },
            { label: "Uptime target", value: "24/7" },
            { label: "Audio quality", value: "384kbps" },
            { label: "Cost", value: "$0" },
          ].map((s) => (
            <div key={s.label} className="border border-white/5 rounded-lg p-6 bg-char/30">
              <div className="text-2xl font-display text-bone mb-1">{s.value}</div>
              <div className="text-xs text-ash uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="scorch-line mx-auto max-w-6xl" />

      {/* VERSIONS */}
      <section id="versions" className="relative mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl sm:text-4xl mb-3">Versions</h2>
        <p className="text-ash leading-relaxed mb-12 max-w-lg">
          Raze is expanding. Two more variants are on the way &mdash; here&apos;s what to expect.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {RAZE.variants.map((v) => (
            <div
              key={v.key}
              className="relative border border-white/5 rounded-lg p-8 bg-char/30 overflow-hidden"
            >
              <div className="absolute top-0 right-0 rounded-bl-lg bg-emberDim/80 px-3 py-1 text-[11px] font-medium text-bone/90">
                {v.status}
              </div>
              <h3 className="font-display text-2xl mb-3">{v.name}</h3>
              <p className="text-sm text-ash leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="scorch-line mx-auto max-w-6xl" />

      {/* SUPPORT */}
      <section id="support" className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl sm:text-4xl mb-4">Support</h2>
        <p className="text-ash leading-relaxed max-w-md mx-auto mb-8">
          A dedicated support server is on the way. Until then, vote for Raze
          or add it to your server to get started.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span className="rounded-md border border-white/10 px-6 py-3 text-sm text-ash cursor-not-allowed">
            Support server &mdash; coming soon
          </span>
          <a
            href={RAZE.topGgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 px-6 py-3 text-sm text-bone hover:border-ember/50 hover:bg-char/40 transition-colors duration-150"
          >
            Vote on Top.gg
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ash">
          <span>&copy; {new Date().getFullYear()} {RAZE.name}. Not affiliated with Discord Inc.</span>
          <div className="flex gap-6">
            <a href={RAZE.inviteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">
              Invite
            </a>
            <a href={RAZE.topGgUrl} target="_blank" rel="noopener noreferrer" className="hover:text-bone transition-colors">
              Top.gg
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
