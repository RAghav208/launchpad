"use client";

import { useEffect, useState } from "react";

function greetingFor(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Greeting({ name }: { name: string }) {
  // Time-of-day must use the visitor's LOCAL time, so compute after mount.
  // SSR + first client render both show the neutral fallback → no hydration mismatch.
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    setGreeting(greetingFor(new Date().getHours()));
  }, []);

  return (
    <h1
      suppressHydrationWarning
      className="font-display text-2xl font-semibold tracking-tight"
    >
      {greeting ?? "Welcome"}, {name}
    </h1>
  );
}
