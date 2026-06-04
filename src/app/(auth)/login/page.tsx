"use client";

import { useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { MetaLabel } from "@/components/ui/card";

type Status = "idle" | "sending" | "sent" | "error";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: name.trim() ? { display_name: name.trim() } : undefined,
      },
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
        <span className="text-signal">◆</span> Launchpad
      </div>

      {status === "sent" ? (
        <div className="rounded-card border border-border bg-surface p-6">
          <MetaLabel>Check your email</MetaLabel>
          <p className="mt-2 text-sm text-fg">
            We sent a magic link to{" "}
            <span className="font-medium">{email}</span>. Open it on this device
            to sign in.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 text-[13px] font-medium text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Use a different email
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="rounded-card border border-border bg-surface p-6"
        >
          <h1 className="font-display text-lg font-semibold tracking-tight">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-muted">
            Your name and email — we&apos;ll send a magic link, no password.
          </p>

          <label htmlFor="name" className="mt-5 block">
            <span className="sr-only">Your name</span>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              className="w-full rounded-control border border-border-strong bg-canvas px-3 py-2.5 text-sm text-fg outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-signal/50"
            />
          </label>

          <label htmlFor="email" className="mt-3 block">
            <span className="sr-only">Email address</span>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-control border border-border-strong bg-canvas px-3 py-2.5 text-sm text-fg outline-none placeholder:text-faint focus-visible:ring-2 focus-visible:ring-signal/50"
            />
          </label>

          {status === "error" && (
            <p className="mt-2 text-[13px] font-medium text-fg">{message}</p>
          )}

          <Button
            type="submit"
            disabled={status === "sending"}
            className="mt-4 w-full"
          >
            {status === "sending" ? "Sending…" : "Send magic link"}
          </Button>
        </form>
      )}
    </div>
  );
}
