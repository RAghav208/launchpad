"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { todayISODate } from "@/lib/srs";

/** Records a completed focus block. Best-effort: never throws to the UI. */
export async function logStudySession(minutes: number) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("study_sessions").insert({
    user_id: user.id,
    occurred_on: todayISODate(),
    minutes,
    kind: "focus",
  });

  revalidatePath("/dashboard");
}
