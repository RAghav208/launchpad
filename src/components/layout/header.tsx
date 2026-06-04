import { ThemeToggle } from "@/components/theme/theme-toggle";
import { SidebarToggle } from "@/components/layout/sidebar-toggle";
import { PomodoroTimer } from "@/components/pomodoro/pomodoro-timer";
import { signOut } from "@/lib/actions/auth";
import type { PomodoroConfig } from "@/lib/data/profile";

export function Header({ pomodoro }: { pomodoro: PomodoroConfig }) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border bg-canvas px-6">
      <SidebarToggle />
      <div className="flex items-center gap-3">
        <PomodoroTimer config={pomodoro} />
        <ThemeToggle />
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-control px-3 py-1.5 text-[13px] font-medium text-muted transition-colors hover:bg-hover hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50"
          >
            Sign out
          </button>
        </form>
      </div>
    </header>
  );
}
