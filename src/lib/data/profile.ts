import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PomodoroConfig = {
  focusMin: number;
  breakMin: number;
  longBreakMin: number;
};

export type Profile = {
  display_name: string | null;
  target_date: string | null;
  theme: "light" | "dark";
  pomodoro: PomodoroConfig;
  email: string | null;
};

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select("display_name, target_date, theme, pomodoro")
    .eq("user_id", user.id)
    .maybeSingle();

  const pomo = (data?.pomodoro ?? {}) as Partial<PomodoroConfig>;

  return {
    display_name: data?.display_name ?? null,
    target_date: data?.target_date ?? null,
    theme: data?.theme === "light" ? "light" : "dark",
    pomodoro: {
      focusMin: pomo.focusMin ?? 25,
      breakMin: pomo.breakMin ?? 5,
      longBreakMin: pomo.longBreakMin ?? 15,
    },
    email: user.email ?? null,
  };
}
