import Link from "next/link";
import { RAZE } from "@/lib/config";

const links = [
  { label: "Commands", href: "#commands" },
  { label: "Status", href: "#status" },
  { label: "Versions", href: "#versions" },
  { label: "Support", href: "#support" },
];

export default function Nav() {
  return (
    <header className="relative z-20 border-b border-white/5">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-ember to-emberDim">
            <span className="text-bone font-display text-base leading-none">R</span>
          </span>
          <span className="font-display text-xl tracking-tight text-bone">{RAZE.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-ash">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-bone transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={RAZE.inviteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-ember px-5 py-2 text-sm font-medium text-bone hover:bg-emberBright transition-colors duration-150"
        >
          Add to Discord
        </a>
      </div>
    </header>
  );
}
