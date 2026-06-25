import Link from "next/link";
import { LogOut, Mountain } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { logout } from "@/lib/auth-actions";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/problems", label: "Problems" },
  { href: "/review", label: "Review" },
  { href: "/progress", label: "Progress" },
];

export async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="z-20 border-b border-edge bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl min-w-0 items-center gap-2 px-3 sm:gap-6 sm:px-4">
        <Link
          href="/"
          aria-label="CodeClimb home"
          className="flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-950/40">
            <Mountain className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className={user ? "hidden md:inline" : "hidden sm:inline"}>
            CodeClimb
          </span>
        </Link>

        {user && (
          <div className="flex min-w-0 items-center gap-0 text-sm sm:gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md px-2 py-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-foreground sm:px-3"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-1 text-sm sm:gap-3">
          {user ? (
            <>
              <span className="hidden items-center gap-2 text-muted sm:flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/15 text-[11px] font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                {user.name}
              </span>
              <form action={logout}>
                <button
                  type="submit"
                  title="Log out"
                  className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-foreground sm:px-3"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Log out</span>
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-md px-3 py-1.5 text-muted transition-colors hover:bg-surface-raised hover:text-foreground"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-indigo-500 px-3 py-1.5 font-medium text-white transition hover:bg-indigo-400"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
