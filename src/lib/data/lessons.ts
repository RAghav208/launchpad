import { createSupabaseServerClient } from "@/lib/supabase/server";

/** Lesson ids the signed-in user has marked done (RLS-scoped). */
export async function getCompletedLessonIds(): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("status", "done");

  if (error || !data) return [];
  return data.map((row) => row.lesson_id as string);
}

export async function getLessonStatus(lessonId: string): Promise<string> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("lesson_progress")
    .select("status")
    .eq("lesson_id", lessonId)
    .maybeSingle();

  return data?.status ?? "unread";
}
