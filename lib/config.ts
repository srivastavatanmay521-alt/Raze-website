// Edit these in one place — the whole site reads from here.
export const RAZE = {
  name: "Raze",
  tagline: "Burn through the silence.",
  subtagline:
    "Lossless music for your server. No paywalls, no ad breaks, no limits — just sound that hits.",
  inviteUrl:
    "https://discord.com/api/oauth2/authorize?client_id=1449788668729360424&permissions=1099947175159&scope=bot%20applications.commands",
  topGgUrl: "https://top.gg/bot/1449788668729360424",
  supportUrl: null as string | null, // "soon" — set this once the support server exists
  clientId: "1449788668729360424",
  variants: [
    {
      key: "canary",
      name: "Raze Canary",
      status: "Coming soon",
      description:
        "The bleeding edge. New features land here first, before they're stable enough for the main bot.",
    },
    {
      key: "premium",
      name: "Raze Premium",
      status: "Coming soon",
      description:
        "A higher tier for servers that want more — think priority queue, higher bitrate ceilings, and dedicated support.",
    },
  ],
};
