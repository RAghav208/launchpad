"use client";

import { useState, useTransition, type KeyboardEvent } from "react";
import type { NoteEntry } from "@/lib/data/notes";
import { NOTE_TOPICS } from "@/content/note-topics";
import {
  addNoteEntry,
  updateNoteEntry,
  deleteNoteEntry,
} from "@/lib/actions/notes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/field";
import { Modal } from "@/components/ui/modal";
import { CloseIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

function formatWhen(iso: string): string {
  const d = new Date(iso);
  const date = d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const time = d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${date} · ${time}`;
}

function deriveTitle(content: string): string {
  const line = content.split("\n").find((l) => l.trim());
  return (line ?? "Untitled").trim();
}

function derivePreview(content: string): string {
  return content
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(1)
    .join("  ");
}

export function NotesView({ entries }: { entries: NoteEntry[] }) {
  const [pending, startTransition] = useTransition();

  // Composer
  const [topic, setTopic] = useState<string>("General");
  const [content, setContent] = useState("");
  const [filter, setFilter] = useState<string>("All");

  // Modal
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draftTopic, setDraftTopic] = useState("General");
  const [draftContent, setDraftContent] = useState("");

  const shown =
    filter === "All" ? entries : entries.filter((e) => e.topic === filter);
  const selected = entries.find((e) => e.id === selectedId) ?? null;

  function add() {
    if (!content.trim()) return;
    const t = topic;
    const c = content;
    startTransition(async () => {
      await addNoteEntry(t, c);
      setContent("");
    });
  }

  function onComposerKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      add();
    }
  }

  function openNote(entry: NoteEntry) {
    setSelectedId(entry.id);
    setEditing(false);
  }

  function closeModal() {
    setSelectedId(null);
    setEditing(false);
  }

  function startEdit() {
    if (!selected) return;
    setDraftTopic(selected.topic);
    setDraftContent(selected.content);
    setEditing(true);
  }

  function saveEdit() {
    if (!selected || !draftContent.trim()) return;
    const id = selected.id;
    const t = draftTopic;
    const c = draftContent;
    startTransition(async () => {
      await updateNoteEntry(id, t, c);
      setEditing(false);
    });
  }

  function removeSelected() {
    if (!selected) return;
    const id = selected.id;
    startTransition(async () => {
      await deleteNoteEntry(id);
    });
    closeModal();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Notes
        </h1>
        <p className="mt-1 text-sm text-muted">
          Jot dated entries and tag them by topic. The first line becomes the
          title.
        </p>
      </div>

      {/* Composer */}
      <Card>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={onComposerKey}
          rows={3}
          placeholder="First line = title, then your notes…  (⌘/Ctrl + Enter to add)"
          className="min-h-[72px] w-full resize-y bg-transparent text-sm leading-relaxed text-fg outline-none placeholder:text-faint"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <Select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="max-w-[180px]"
          >
            {NOTE_TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <Button onClick={add} disabled={pending || !content.trim()}>
            Add entry
          </Button>
        </div>
      </Card>

      {/* Topic filter */}
      <div className="flex flex-wrap gap-1.5">
        {["All", ...NOTE_TOPICS].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={cn(
              "rounded-full border px-3 py-1 text-[13px] transition-colors",
              filter === t
                ? "border-transparent bg-ink-weak font-medium text-fg"
                : "border-border text-muted hover:bg-hover hover:text-fg",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Preview cards */}
      {shown.length === 0 ? (
        <Card>
          <p className="text-sm text-muted">
            No entries{filter !== "All" ? ` under ${filter}` : ""} yet. Add your
            first above. 👆
          </p>
        </Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {shown.map((e) => {
            const preview = derivePreview(e.content);
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => openNote(e)}
                className="flex flex-col rounded-card border border-border bg-surface p-4 text-left transition-colors hover:bg-hover"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10.5px] text-muted">
                    {e.topic}
                  </span>
                  <span className="font-mono text-[10.5px] text-faint">
                    {formatWhen(e.created_at)}
                  </span>
                </div>
                <p className="mt-2 truncate font-medium text-fg">
                  {deriveTitle(e.content)}
                </p>
                {preview && (
                  <p className="mt-1 line-clamp-2 text-[13px] text-muted">
                    {preview}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Note popup */}
      <Modal open={!!selected} onClose={closeModal}>
        {selected && (
          <>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10.5px] text-muted">
                  {editing ? draftTopic : selected.topic}
                </span>
                <span className="font-mono text-[10.5px] text-faint">
                  {formatWhen(selected.created_at)}
                </span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="inline-flex size-7 items-center justify-center rounded-control text-muted transition-colors hover:bg-hover hover:text-fg"
              >
                <CloseIcon className="size-4" />
              </button>
            </div>

            {editing ? (
              <>
                <textarea
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                  rows={10}
                  className="mt-3 min-h-[220px] w-full resize-y bg-transparent text-sm leading-relaxed text-fg outline-none placeholder:text-faint"
                />
                <div className="mt-3 flex items-center justify-between gap-3">
                  <Select
                    value={draftTopic}
                    onChange={(e) => setDraftTopic(e.target.value)}
                    className="max-w-[180px]"
                  >
                    {NOTE_TOPICS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={saveEdit}
                      disabled={pending || !draftContent.trim()}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-3 max-h-[60vh] overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-fg">
                  {selected.content}
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={removeSelected}
                    disabled={pending}
                  >
                    Delete
                  </Button>
                  <Button variant="secondary" onClick={startEdit}>
                    Edit
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}
