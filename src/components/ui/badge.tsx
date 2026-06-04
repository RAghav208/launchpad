import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Signal-colored count badge — reserved for live/"due" indicators. */
export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-signal-weak px-2 py-0.5 font-mono text-[10.5px] font-medium text-signal",
        className,
      )}
      {...props}
    />
  );
}
