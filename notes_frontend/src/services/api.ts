import { Note, SortOption, Tag, UUID } from '../types/note';
import { loadJSON, saveJSON } from '../utils/storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const NOTES_KEY = 'notes';
const TAGS_KEY = 'tags';



// Simple in-memory cache for session performance
let cache: { notes: Note[]; tags: Tag[] } | null = null;

// PUBLIC_INTERFACE
export async function getNotes(): Promise<Note[]> {
  /** Retrieve all notes. Integrate with backend here in future. */
  if (cache?.notes) return cache.notes;
  const notes = await loadJSON<Note[]>(NOTES_KEY, []);
  const tags = await loadJSON<Tag[]>(TAGS_KEY, []);
  cache = { notes, tags };
  return notes;
}

// PUBLIC_INTERFACE
export async function getNoteById(id: UUID): Promise<Note | undefined> {
  /** Retrieve a single note by id. */
  const notes = await getNotes();
  return notes.find(n => n.id === id);
}

// PUBLIC_INTERFACE
export async function createNote(partial: Pick<Note, 'title' | 'content' | 'tags'>): Promise<Note> {
  /** Create a new note; returns created Note. */
  const now = new Date().toISOString();
  const newNote: Note = {
    id: uuidv4(),
    title: partial.title || 'Untitled',
    content: partial.content || '',
    tags: partial.tags || [],
    createdAt: now,
    updatedAt: now,
  };
  const notes = await getNotes();
  const next = [newNote, ...notes];
  cache = { ...(cache || { tags: [] as Tag[] }), notes: next };
  await saveJSON(NOTES_KEY, next);
  return newNote;
}

// PUBLIC_INTERFACE
export async function updateNote(id: UUID, updates: Partial<Pick<Note, 'title' | 'content' | 'tags' | 'pinned'>>): Promise<Note | undefined> {
  /** Update a note by id; returns updated Note or undefined if missing. */
  const notes = await getNotes();
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return undefined;
  const now = new Date().toISOString();
  const updated: Note = { ...notes[idx], ...updates, updatedAt: now };
  const next = [...notes];
  next[idx] = updated;
  cache = { ...(cache || { tags: [] as Tag[] }), notes: next };
  await saveJSON(NOTES_KEY, next);
  return updated;
}

// PUBLIC_INTERFACE
export async function deleteNote(id: UUID): Promise<boolean> {
  /** Delete a note by id; returns true if deleted. */
  const notes = await getNotes();
  const next = notes.filter(n => n.id !== id);
  const changed = next.length !== notes.length;
  if (changed) {
    cache = { ...(cache || { tags: [] as Tag[] }), notes: next };
    await saveJSON(NOTES_KEY, next);
  }
  return changed;
}

// PUBLIC_INTERFACE
export async function getTags(): Promise<Tag[]> {
  /** Retrieve all tags. */
  if (cache?.tags) return cache.tags;
  const tags = await loadJSON<Tag[]>(TAGS_KEY, []);
  cache = { ...(cache || { notes: [] as Note[] }), tags };
  return tags;
}

// PUBLIC_INTERFACE
export async function upsertTag(name: string, color?: string): Promise<Tag> {
  /** Create or return existing tag by name. */
  const tags = await getTags();
  const existing = tags.find(t => t.name.toLowerCase() === name.toLowerCase());
  if (existing) return existing;
  const tag: Tag = { id: uuidv4(), name, color };
  const next = [...tags, tag];
  cache = { ...(cache || { notes: [] as Note[] }), tags: next };
  await saveJSON(TAGS_KEY, next);
  return tag;
}

// PUBLIC_INTERFACE
export function sortNotes(notes: Note[], option: SortOption): Note[] {
  /** Sort notes by a given option. */
  const sorted = [...notes];
  switch (option) {
    case 'updated_desc':
      sorted.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
      break;
    case 'updated_asc':
      sorted.sort((a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt));
      break;
    case 'title_asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title_desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'created_desc':
      sorted.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
      break;
    case 'created_asc':
      sorted.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
      break;
  }
  return sorted;
}

// PUBLIC_INTERFACE
export function searchNotes(notes: Note[], query: string): Note[] {
  /** Simple client-side search by title/content. */
  const q = query.trim().toLowerCase();
  if (!q) return notes;
  return notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
}
