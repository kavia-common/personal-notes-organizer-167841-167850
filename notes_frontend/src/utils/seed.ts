import { createNote, upsertTag } from '../services/api';

// PUBLIC_INTERFACE
export async function seedExampleNotes(): Promise<void> {
  /** Seeds a few example notes and tags if the app has no content. Call manually if desired. */
  const work = await upsertTag('Work', '#DBEAFE');
  const personal = await upsertTag('Personal', '#FEF3C7');
  await createNote({
    title: 'Welcome to Personal Notes',
    content:
      'This is your first note. Tap it to edit. Use the + button to add new notes. Try search, sort and tags to organize.',
    tags: [personal],
  });
  await createNote({
    title: 'Project Ideas',
    content:
      '- Build a habit tracker\n- Create a recipe book app\n- Learn a new library each month',
    tags: [work],
  });
  await createNote({
    title: 'Groceries',
    content:
      'Milk\nEggs\nBread\nCoffee\nBlueberries',
    tags: [personal],
  });
}
