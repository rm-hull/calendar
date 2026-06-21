import { useLocalStorage } from "@rm-hull/use-local-storage";
import { useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { JournalEntry, JournalCategory, JournalState } from "@/types/journal";

export function useJournal() {
  const { value, setValue, isLoading } = useLocalStorage<JournalState>("calendar.journal");

  const entries = useMemo(() => value?.entries ?? [], [value]);
  const categories = useMemo(() => value?.categories ?? [], [value]);

  const addEntry = useCallback(
    (date: string, content: string, categoryIds: string[]) => {
      const now = new Date().toISOString();
      const newEntry: JournalEntry = {
        id: uuidv4(),
        date,
        content,
        categories: categoryIds,
        createdAt: now,
        updatedAt: now,
      };

      setValue({
        entries: [...entries, newEntry],
        categories,
      });
    },
    [entries, categories, setValue]
  );

  const updateEntry = useCallback(
    (entryId: string, updates: Partial<JournalEntry>) => {
      const updatedEntries = entries.map((entry) =>
        entry.id === entryId ? { ...entry, ...updates, updatedAt: new Date().toISOString() } : entry
      );
      setValue({
        entries: updatedEntries,
        categories,
      });
    },
    [entries, categories, setValue]
  );

  const deleteEntry = useCallback(
    (entryId: string) => {
      const updatedEntries = entries.filter((entry) => entry.id !== entryId);
      setValue({
        entries: updatedEntries,
        categories,
      });
    },
    [entries, categories, setValue]
  );

  const addCategory = useCallback(
    (name: string, color?: string) => {
      const newCategory: JournalCategory = {
        id: uuidv4(),
        name,
        color,
      };
      setValue({
        entries,
        categories: [...categories, newCategory],
      });
    },
    [entries, categories, setValue]
  );

  return {
    entries,
    categories,
    addEntry,
    updateEntry,
    deleteEntry,
    addCategory,
    isLoading,
  };
}
