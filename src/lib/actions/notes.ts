"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function addNoteEntry(topic: string, content: string) {
  const trimmed = content.trim();
  if (!trimmed) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("note_entries").insert({
    user_id: user.id,
    topic: topic || "General",
    content: trimmed,
  });
  if (error) throw new Error(error.message);

  revalidatePath("/notes");
}

export async function updateNoteEntry(id: string, topic: string, content: string) {
  const trimmed = content.trim();
  if (!trimmed) return;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("note_entries")
    .update({ topic: topic || "General", content: trimmed })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/notes");
}

export async function deleteNoteEntry(id: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("note_entries").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/notes");
}
