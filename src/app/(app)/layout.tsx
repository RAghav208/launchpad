import { cookies } from "next/headers";
import { AppShell } from "@/components/layout/app-shell";
import { getProfile } from "@/lib/data/profile";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Persisted sidebar state (server-read → no flash).
  const cookieStore = await cookies();
  const collapsed = cookieStore.get("sidebar_collapsed")?.value === "true";

  // Pomodoro config for the header timer.
  const profile = await getProfile();
  const pomodoro = profile?.pomodoro ?? {
    focusMin: 25,
    breakMin: 5,
    longBreakMin: 15,
  };

  return (
    <AppShell defaultCollapsed={collapsed} pomodoro={pomodoro}>
      {children}
    </AppShell>
  );
}
