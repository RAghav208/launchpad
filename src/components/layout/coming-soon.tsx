import { MetaLabel } from "@/components/ui/card";

export function ComingSoon({ title, phase }: { title: string; phase: string }) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center text-center">
      <MetaLabel>{phase}</MetaLabel>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted">
        This section arrives in a later build phase. The foundation, design
        system, and dashboard are live — more is on the way.
      </p>
    </div>
  );
}
