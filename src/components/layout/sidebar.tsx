"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";
import { cn } from "@/lib/cn";
import { useSidebar } from "@/components/layout/sidebar-context";

export function Sidebar({ practiceDue = 0 }: { practiceDue?: number }) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <aside
      id="app-sidebar"
      inert={collapsed}
      aria-hidden={collapsed || undefined}
      className={cn(
        "hidden shrink-0 overflow-hidden bg-sidebar transition-[width] duration-200 ease-in-out md:block",
        collapsed ? "w-0 border-r-0" : "w-60 border-r border-border",
      )}
    >
      {/* Fixed-width inner so content doesn't reflow while the aside width animates. */}
      <div className="flex h-full w-60 flex-col overflow-y-auto p-4">
        <div className="flex items-center gap-2 px-2 pb-6 font-display text-lg font-semibold tracking-tight">
          <span className="text-signal">◆</span> Launchpad
        </div>

        <nav className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const badge =
              item.href === "/practice" ? practiceDue : item.badge ?? 0;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-3 rounded-control px-3 py-2 text-[13.5px] font-medium transition-colors",
                  active
                    ? "bg-ink-weak font-semibold text-fg"
                    : "text-muted hover:bg-hover hover:text-fg",
                )}
              >
                {active && (
                  <span className="absolute -left-4 top-2 bottom-2 w-[3px] rounded-r-full bg-fg" />
                )}
                <Icon className="size-4 opacity-90" />
                {item.label}
                {badge > 0 ? (
                  <span className="ml-auto rounded-full bg-signal-weak px-1.5 py-0.5 font-mono text-[10.5px] font-medium text-signal">
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}