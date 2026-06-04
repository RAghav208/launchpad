"use client";

import { useEffect, useRef, useState } from "react";
import type { PomodoroConfig } from "@/lib/data/profile";
import { logStudySession } from "@/lib/actions/study";
import { PlayIcon, PauseIcon, ResetIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

type Mode = "focus" | "break" | "longBreak";

const LABEL: Record<Mode, string> = {
  focus: "Focus",
  break: "Break",
  longBreak: "Long break",
};

const PRESETS = [15, 25, 45, 50];

export function PomodoroTimer({ config }: { config: PomodoroConfig }) {
  const [focusMin, setFocusMin] = useState(config.focusMin);
  const [mode, setMode] = useState<Mode>("focus");
  const [secondsLeft, setSecondsLeft] = useState(() => config.focusMin * 60);
  const [running, setRunning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [custom, setCustom] = useState("");
  const focusCount = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const minutesFor = (m: Mode) =>
    m === "focus"
      ? focusMin
      : m === "break"
        ? config.breakMin
        : config.longBreakMin;

  // Countdown tick
  useEffect(() => {
    if (!running) return;
    const id = setInterval(
      () => setSecondsLeft((s) => Math.max(0, s - 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [running]);

  // Block finished → log focus + advance mode
  useEffect(() => {
    if (!running || secondsLeft !== 0) return;
    setRunning(false);
    if (mode === "focus") {
      void logStudySession(focusMin);
      focusCount.current += 1;
      const next: Mode = focusCount.current % 4 === 0 ? "longBreak" : "break";
      setMode(next);
      setSecondsLeft(
        (next === "break" ? config.breakMin : config.longBreakMin) * 60,
      );
    } else {
      setMode("focus");
      setSecondsLeft(focusMin * 60);
    }
  }, [secondsLeft, running, mode, focusMin, config]);

  // Close the duration menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function onDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  function applyFocus(min: number) {
    if (!Number.isFinite(min)) return;
    const m = Math.max(1, Math.min(180, Math.round(min)));
    setFocusMin(m);
    setMode("focus");
    setSecondsLeft(m * 60);
    setRunning(false);
    setMenuOpen(false);
    setCustom("");
  }

  function reset() {
    setRunning(false);
    setSecondsLeft(minutesFor(mode) * 60);
  }

  const time = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return (
    <div
      ref={rootRef}
      className="relative flex items-center gap-1.5 rounded-control border border-border py-1 pl-1 pr-1.5"
    >
      <button
        type="button"
        onClick={() => setRunning((r) => !r)}
        aria-label={running ? "Pause focus timer" : "Start focus timer"}
        className="inline-flex size-6 items-center justify-center rounded-[5px] text-fg transition-colors hover:bg-hover"
      >
        {running ? (
          <PauseIcon className="size-3.5" />
        ) : (
          <PlayIcon className="size-3.5" />
        )}
      </button>

      <span
        className={cn(
          "size-[6px] rounded-full",
          running ? "bg-signal" : "bg-faint",
        )}
      />

      <button
        type="button"
        onClick={() => setMenuOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label="Set focus length"
        className="flex items-center gap-1.5 rounded-[5px] px-1 py-0.5 transition-colors hover:bg-hover"
      >
        <span
          className={cn(
            "font-mono text-xs tabular-nums",
            running ? "text-fg" : "text-muted",
          )}
        >
          {time}
        </span>
        <span className="hidden text-[10px] uppercase tracking-wide text-faint sm:inline">
          {LABEL[mode]}
        </span>
      </button>

      <button
        type="button"
        onClick={reset}
        aria-label="Reset timer"
        className="inline-flex size-6 items-center justify-center rounded-[5px] text-muted transition-colors hover:bg-hover hover:text-fg"
      >
        <ResetIcon className="size-3.5" />
      </button>

      {menuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+6px)] z-50 w-52 rounded-card border border-border bg-surface p-3 shadow-lg"
        >
          <p className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-muted">
            Focus length
          </p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => applyFocus(p)}
                className={cn(
                  "rounded-[5px] border px-1 py-1.5 text-[13px] transition-colors",
                  focusMin === p
                    ? "border-transparent bg-ink-weak font-medium text-fg"
                    : "border-border text-muted hover:bg-hover hover:text-fg",
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="mt-2 flex gap-1.5">
            <input
              type="number"
              min={1}
              max={180}
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && custom) applyFocus(Number(custom));
              }}
              placeholder="Custom min"
              className="w-full rounded-control border border-border-strong bg-canvas px-2 py-1 text-[13px] text-fg outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-signal/50"
            />
            <button
              type="button"
              onClick={() => custom && applyFocus(Number(custom))}
              className="rounded-control bg-ink px-2.5 text-[13px] font-medium text-on-ink transition-opacity hover:opacity-90"
            >
              Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
