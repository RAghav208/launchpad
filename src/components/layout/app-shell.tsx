"use client";

import { useCallback, useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { SidebarContext } from "@/components/layout/sidebar-context";
import type { PomodoroConfig } from "@/lib/data/profile";

const SIDEBAR_COOKIE = "sidebar_collapsed";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function writeCookie(collapsed: boolean) {
  document.cookie = `${SIDEBAR_COOKIE}=${collapsed}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
}

export function AppShell({
  defaultCollapsed,
  pomodoro,
  children,
}: {
  defaultCollapsed: boolean;
  pomodoro: PomodoroConfig;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsedState] = useState(defaultCollapsed);

  const setCollapsed = useCallback((value: boolean) => {
    setCollapsedState(value);
    writeCookie(value);
  }, []);

  const toggle = useCallback(() => {
    setCollapsedState((prev) => {
      const next = !prev;
      writeCookie(next);
      return next;
    });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        toggle();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle, setCollapsed }}>
      <div className="flex min-h-dvh">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Header pomodoro={pomodoro} />
          <main className="flex-1 px-6 py-7 md:px-8">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
}
