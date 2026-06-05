"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { SRS_DEFAULT, applySm2, dueDateFrom } from "@/lib/srs";

/** Apply one SM-2 review to a flashcard / predict-output item. */
export async function reviewItem(cardId: string, quality: number) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: row } = await supabase
    .from("srs_cards")
    .select("ease_factor, repetitions, interval_days")
    .eq("card_id", cardId)
    .maybeSingle();

  const current = row
    ? {
        easeFactor: row.ease_factor,
        repetitions: row.repetitions,
        intervalDays: row.interval_days,
      }
    : SRS_DEFAULT;

  const srs = applySm2(current, quality);

  const { error } = await supabase.from("srs_cards").upsert(
    {
      user_id: user.id,
      card_id: cardId,
      ease_factor: srs.easeFactor,
      repetitions: srs.repetitions,
      interval_days: srs.intervalDays,
      due_date: dueDateFrom(srs.intervalDays),
      last_quality: quality,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,card_id" },
  );
  if (error) throw new Error(error.message);
}
