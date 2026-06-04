import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DsaEntry = {
  id: string;
  name: string;
  pattern: string | null;
  difficulty: string | null;
  solved_unaided: boolean;
  url: string | null;
  ease_factor: number;
  repetitions: number;
  interval_days: number;
  due_date: string;
  created_at: string;
  updated_at: string;
};

/** All DSA log entries for the signed-in user, newest first (RLS-scoped). */
export async function getDsaEntries(): Promise<DsaEntry[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("dsa_log")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as DsaEntry[];
}
