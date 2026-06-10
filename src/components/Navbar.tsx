import Link from "next/link";
import { Mountain } from "lucide-react";

const links = [
  { href: "/problems", label: "Problems" },
  { href: "/progress", label: "Progress" },
];

export function Navbar() {
  return (
    <header className="z-20 border-b border-edge bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/40">
            <Mountain className="h-4 w-4" strokeWidth={2.5} />
          </span>
          CodeClimb
        </Link>
        <div className="flex items-center gap-1 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
