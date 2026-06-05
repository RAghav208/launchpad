"use client";

import { useState, useTransition } from "react";
import { setLessonDone } from "@/lib/actions/lessons";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";

export function MarkCompleteButton({
  lessonId,
  initialDone,
}: {
  lessonId: string;
  initialDone: boolean;
}) {
  const [done, setDone] = useState(initialDone);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !done;
    setDone(next);
    startTransition(async () => {
      try {
        await setLessonDone(lessonId, next);
      } catch {
        setDone(!next);
      }
    });
  }

  return (
    <Button
      variant={done ? "secondary" : "primary"}
      onClick={toggle}
      disabled={pending}
    >
      {done ? (
        <>
          <CheckIcon className="size-4" /> Completed
        </>
      ) : (
        "Mark complete"
      )}
    </Button>
  );
}
