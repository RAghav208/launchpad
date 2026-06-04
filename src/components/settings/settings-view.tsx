"use client";

import { useEffect, useState, useTransition } from "react";
import type { Profile } from "@/lib/data/profile";
import { updateProfile } from "@/lib/actions/profile";
import { signOut } from "@/lib/actions/auth";
import { useTheme } from "@/components/theme/theme-provider";
import { Card, MetaLabel } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { cn } from "@/lib/cn";

export function SettingsView({ profile }: { profile: Profile }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const [displayName, setDisplayName] = useState(profile.display_name ?? "");
  const [targetDate, setTargetDate] = useState(profile.target_date ?? "");
  const [focusMin, setFocusMin] = useState(profile.pomodoro.focusMin);
  const [breakMin, setBreakMin] = useState(profile.pomodoro.breakMin);
  const [longBreakMin, setLongBreakMin] = useState(profile.pomodoro.longBreakMin);

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function save() {
    setSaved(false);
    startTransition(async () => {
      await updateProfile({
        displayName: displayName.trim(),
        targetDate: targetDate || null,
        pomodoro: { focusMin, breakMin, longBreakMin },
      });
      setSaved(true);
    });
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage your profile, study preferences, and account.
        </p>
      </div>

      {/* Profile */}
      <Card>
        <MetaLabel>Profile</MetaLabel>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-muted">Display name</span>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-muted">Target date</span>
            <Input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </label>
        </div>
      </Card>

      {/* Pomodoro */}
      <Card>
        <MetaLabel>Pomodoro timer</MetaLabel>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-muted">Focus (min)</span>
            <Input
              type="number"
              min={1}
              max={120}
              value={focusMin}
              onChange={(e) => setFocusMin(Number(e.target.value) || 0)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-muted">Break (min)</span>
            <Input
              type="number"
              min={1}
              max={60}
              value={breakMin}
              onChange={(e) => setBreakMin(Number(e.target.value) || 0)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] text-muted">Long break (min)</span>
            <Input
              type="number"
              min={1}
              max={60}
              value={longBreakMin}
              onChange={(e) => setLongBreakMin(Number(e.target.value) || 0)}
            />
          </label>
        </div>
      </Card>

      {/* Save (covers profile + pomodoro) */}
      <div className="flex items-center gap-3">
        <Button onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </Button>
        {saved && !pending && (
          <span className="text-[13px] text-muted">Saved ✓</span>
        )}
      </div>

      {/* Appearance */}
      <Card>
        <MetaLabel>Appearance</MetaLabel>
        <p className="mt-2 text-[13px] text-muted">
          Theme is remembered on this device.
        </p>
        <div className="mt-3 inline-flex rounded-control border border-border p-0.5">
          {(["light", "dark"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={cn(
                "rounded-[5px] px-3 py-1.5 text-[13px] capitalize transition-colors",
                mounted && theme === t
                  ? "bg-ink-weak font-medium text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      {/* Account */}
      <Card>
        <MetaLabel>Account</MetaLabel>
        <p className="mt-2 text-sm text-fg">{profile.email}</p>
        <form action={signOut} className="mt-3">
          <Button variant="secondary" type="submit">
            Sign out
          </Button>
        </form>
      </Card>
    </div>
  );
}
