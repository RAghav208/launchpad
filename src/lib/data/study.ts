import { createSupabaseServerClient } from "@/lib/supabase/server";
import { startOfWeekISODate, todayISODate } from "@/lib/srs";

export type StudyTotals = { todayMinutes: number; weekMinutes: number };

/** Focus minutes logged today and so far this week (RLS-scoped). */
export async function getStudyTotals(): Promise<StudyTotals> {
  const supabase = await createSupabaseServerClient();
  const weekStart = startOfWeekISODate();
  const today = todayISODate();

  const { data } = await supabase
    .from("study_sessions")
    .select("minutes, occurred_on")
    .gte("occurred_on", weekStart);

  let todayMinutes = 0;
  let weekMinutes = 0;
  for (const row of data ?? []) {
    const mins = (row.minutes as number) ?? 0;
    weekMinutes += mins;
    if (row.occurred_on === today) todayMinutes += mins;
  }

  return { todayMinutes, weekMinutes };
}
