export interface JournalCategory {
  id: string;
  name: string;
  color?: string;
}

export interface JournalEntry {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  content: string;
  categories: string[]; // Array of category IDs
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface JournalState {
  entries: JournalEntry[];
  categories: JournalCategory[];
}
