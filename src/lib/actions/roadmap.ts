"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function setRoadmapTaskDone(taskId: string, done: boolean) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("roadmap_progress").upsert(
    {
      user_id: user.id,
      task_id: taskId,
      done,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,task_id" },
  );
  if (error) throw new Error(error.message);

  revalidatePath("/roadmap");
}
