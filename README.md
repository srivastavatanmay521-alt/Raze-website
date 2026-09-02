# Raze — bot website

Next.js site for the Raze Discord music bot. Deploys straight to Vercel.

## Deploy

1. Push this folder to a GitHub repo.
2. Import it in Vercel (vercel.com → Add New → Project).
3. Vercel auto-detects Next.js — no config needed. Deploy.

Your site and `/admin` route will both be live at your Vercel domain
immediately. The homepage works with zero setup. The admin panel needs
one more step (below) before it does anything.

## Setting up the admin panel (`/admin`)

`/admin` is not linked anywhere on the site — no nav link, no footer
link, and it's excluded from search engines via `robots.txt`. It's only
reachable by typing the URL directly. That said, this is *obscurity*,
not *security*: it doesn't require a link to be found, and the route
name is visible to anyone who inspects your site's build output. Treat
it as "hidden from casual visitors," not "cryptographically secret."

To make it functional:

1. Create a free project at [supabase.com](https://supabase.com).
2. In Supabase → SQL Editor, run everything in `supabase/schema.sql`.
   This creates the tables the dashboard reads/writes (bot status,
   feature flags, announcements) and locks them to logged-in users only.
3. In Supabase → Authentication → Users → Add user, create your own
   login (your email + a real password). This is what you'll type into
   `/admin` — there's no separate "admin password," your Supabase login
   *is* the password gate.
4. In Supabase → Settings → API, copy the Project URL and the `anon`
   public key.
5. In Vercel → your project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Redeploy. `/admin` will now show a real login form.

## What the admin panel actually controls right now

Toggling things in `/admin` updates rows in your Supabase database —
it does **not** reach into a running Discord bot process by itself.
To make a toggle (like "mark bot offline" or a feature flag) actually
change what Raze does in Discord, your bot's code needs to read from
the same Supabase tables (e.g. poll `feature_flags` on startup, or
subscribe to Supabase Realtime) and act on them. That wiring lives in
your bot's codebase, not this website — this site gives you the
control surface, your bot needs to listen to it.

## Editing bot links / copy

Everything bot-specific (invite link, Top.gg link, tagline, command
list) lives in `lib/config.ts` and `app/page.tsx` — edit there.

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in your Supabase values
npm run dev
```
