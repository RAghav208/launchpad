import { createSupabaseServerClient } from "@/lib/supabase/server";

export type NoteEntry = {
  id: string;
  topic: string;
  content: string;
  created_at: string;
};

/** All note entries for the signed-in user, newest first (RLS-scoped). */
export async function getNoteEntries(): Promise<NoteEntry[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("note_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data as NoteEntry[];
}
