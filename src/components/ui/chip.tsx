import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Outlined pill for small metadata (e.g. the target countdown). */
export function Chip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted",
        className,
      )}
      {...props}
    />
  );
}
