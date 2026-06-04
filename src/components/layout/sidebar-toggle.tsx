"use client";

import { useSidebar } from "@/components/layout/sidebar-context";
import { PanelLeftIcon } from "@/components/icons";

export function SidebarToggle() {
  const { collapsed, toggle } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
      aria-expanded={!collapsed}
      aria-controls="app-sidebar"
      aria-keyshortcuts="Control+B Meta+B"
      title={`${collapsed ? "Show" : "Hide"} sidebar  (Ctrl/⌘ B)`}
      className="hidden size-9 items-center justify-center rounded-control border border-border text-muted transition-colors hover:bg-hover hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/50 md:inline-flex"
    >
      <PanelLeftIcon className="size-4" />
    </button>
  );
}
