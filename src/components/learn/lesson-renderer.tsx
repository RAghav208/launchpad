import { Fragment, type ReactNode } from "react";
import type { LessonBlock } from "@/content/types";
import { CodeBlock } from "@/components/learn/code-block";
import { DsaIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

/** Renders inline `code` spans inside prose. */
function renderInline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`)/g).map((seg, i) =>
    seg.startsWith("`") && seg.endsWith("`") ? (
      <code
        key={i}
        className="rounded bg-track px-1.5 py-0.5 font-mono text-[12.5px]"
      >
        {seg.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{seg}</Fragment>
    ),
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">
      {children}
    </p>
  );
}

const TONE_LABEL = { tip: "Tip", note: "Note", warn: "Heads up" } as const;

export function LessonRenderer({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case "heading":
            return (
              <h2
                key={i}
                className="mt-2 font-display text-lg font-semibold tracking-tight text-fg"
              >
                {renderInline(block.text)}
              </h2>
            );

          case "prose":
            return (
              <p key={i} className="text-[15px] leading-7 text-fg">
                {renderInline(block.text)}
              </p>
            );

          case "code":
            return (
              <CodeBlock
                key={i}
                code={block.code}
                lang={block.lang}
                caption={block.caption}
              />
            );

          case "keypoints":
            return (
              <div key={i} className="rounded-card border border-border bg-surface p-5">
                <Eyebrow>Key points</Eyebrow>
                <ul className="mt-3 flex flex-col gap-2.5">
                  {block.points.map((p, j) => (
                    <li key={j} className="flex gap-3 text-[14px] leading-6 text-fg">
                      <span
                        aria-hidden
                        className="mt-[9px] size-1 shrink-0 rounded-full bg-faint"
                      />
                      <span>{renderInline(p)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "callout":
            return (
              <div
                key={i}
                className={cn(
                  "rounded-card border bg-surface p-5",
                  block.tone === "warn" ? "border-border-strong" : "border-border",
                )}
              >
                <Eyebrow>{TONE_LABEL[block.tone]}</Eyebrow>
                <p className="mt-1.5 text-[14px] leading-6 text-fg">
                  {renderInline(block.text)}
                </p>
              </div>
            );

          case "practice":
            return (
              <div key={i} className="rounded-card border border-border bg-surface p-5">
                <Eyebrow>
                  <DsaIcon className="size-3.5" /> Try it in your editor
                </Eyebrow>
                {block.text ? (
                  <p className="mt-1.5 text-[14px] leading-6 text-fg">
                    {renderInline(block.text)}
                  </p>
                ) : null}
                {block.items && block.items.length > 0 ? (
                  <ol className="mt-3 flex flex-col gap-2.5">
                    {block.items.map((it, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[14px] leading-6 text-fg"
                      >
                        <span className="shrink-0 font-mono text-[12px] text-faint">
                          {j + 1}.
                        </span>
                        <span>{renderInline(it)}</span>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
            );
        }
      })}
    </div>
  );
}