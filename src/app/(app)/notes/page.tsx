import { getNoteEntries } from "@/lib/data/notes";
import { NotesView } from "@/components/notes/notes-view";

export default async function NotesPage() {
  const entries = await getNoteEntries();
  return <NotesView entries={entries} />;
}
