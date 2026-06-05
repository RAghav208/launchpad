import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ALL_REVIEW_ITEMS } from "@/content";
import type { ReviewItem } from "@/content/types";
import { todayISODate } from "@/lib/srs";

export type ReviewQueue = {
  queue: ReviewItem[];
  dueCount: number;
  newCount: number;
  total: number;
};

/** Items to practice now: never-reviewed ("new") + due. Optionally scoped to one lesson. */
export async function getReviewQueue(lessonId?: string): Promise<ReviewQueue> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from("srs_cards").select("card_id, due_date");

  const dueMap = new Map<string, string>();
  for (const row of data ?? []) {
    dueMap.set(row.card_id as string, row.due_date as string);
  }

  const items = lessonId
    ? ALL_REVIEW_ITEMS.filter((it) => it.lessonId === lessonId)
    : ALL_REVIEW_ITEMS;

  const today = todayISODate();
  const queue: ReviewItem[] = [];
  let dueCount = 0;
  let newCount = 0;

  for (const item of items) {
    const due = dueMap.get(item.id);
    if (due === undefined) {
      newCount++;
      queue.push(item);
    } else if (due <= today) {
      dueCount++;
      queue.push(item);
    }
  }

  return { queue, dueCount, newCount, total: items.length };
}