import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Completed roadmap task ids for the signed-in user (RLS scopes rows to them). */
export async function getRoadmapDoneIds(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("roadmap_progress")
    .select("task_id")
    .eq("done", true);

  if (error || !data) return [];
  return data.map((row) => row.task_id as string);
}
