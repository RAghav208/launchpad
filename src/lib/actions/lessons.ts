"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function setLessonDone(lessonId: string, done: boolean) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      lesson_id: lessonId,
      status: done ? "done" : "unread",
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" },
  );
  if (error) throw new Error(error.message);

  revalidatePath("/learn");
  revalidatePath(`/learn/${lessonId}`);
}
