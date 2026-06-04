"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PomodoroConfig } from "@/lib/data/profile";

export async function updateProfile(input: {
  displayName: string;
  targetDate: string | null;
  pomodoro: PomodoroConfig;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("profiles").upsert(
    {
      user_id: user.id,
      display_name: input.displayName || null,
      target_date: input.targetDate || null,
      pomodoro: input.pomodoro,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw new Error(error.message);

  revalidatePath("/settings");
  revalidatePath("/dashboard");
}
