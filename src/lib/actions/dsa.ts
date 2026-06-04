"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SRS_DEFAULT, applySm2, dueDateFrom } from "@/lib/srs";

type AddInput = {
  name: string;
  pattern: string;
  difficulty: string;
  solvedUnaided: boolean;
  url?: string;
};

export async function addDsaProblem(input: AddInput) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Seed the schedule from how the first solve went.
  const srs = applySm2(SRS_DEFAULT, input.solvedUnaided ? 4 : 3);

  const { error } = await supabase.from("dsa_log").insert({
    user_id: user.id,
    name: input.name,
    pattern: input.pattern || null,
    difficulty: input.difficulty || null,
    solved_unaided: input.solvedUnaided,
    url: input.url || null,
    ease_factor: srs.easeFactor,
    repetitions: srs.repetitions,
    interval_days: srs.intervalDays,
    due_date: dueDateFrom(srs.intervalDays),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/dsa");
}

export async function reviewDsaProblem(id: string, quality: number) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: row, error: readError } = await supabase
    .from("dsa_log")
    .select("ease_factor, repetitions, interval_days")
    .eq("id", id)
    .single();
  if (readError || !row) throw new Error(readError?.message ?? "Problem not found");

  const srs = applySm2(
    {
      easeFactor: row.ease_factor,
      repetitions: row.repetitions,
      intervalDays: row.interval_days,
    },
    quality,
  );

  const { error } = await supabase
    .from("dsa_log")
    .update({
      ease_factor: srs.easeFactor,
      repetitions: srs.repetitions,
      interval_days: srs.intervalDays,
      due_date: dueDateFrom(srs.intervalDays),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dsa");
}

export async function deleteDsaProblem(id: string) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("dsa_log").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/dsa");
}
