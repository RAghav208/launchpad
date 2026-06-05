import { highlightPython } from "@/lib/highlight";

export function CodeBlock({
  code,
  lang = "python",
  caption,
}: {
  code: string;
  lang?: "python" | "text";
  caption?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-card border border-border">
      <pre className="overflow-x-auto bg-code-bg p-4 font-mono text-[13px] leading-relaxed text-fg">
        <code>{lang === "python" ? highlightPython(code) : code}</code>
      </pre>
      {caption && (
        <figcaption className="border-t border-border bg-surface px-4 py-2 text-xs text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
