export type CalendarEvents = Record<string, CalendarEvent[]>;

export type CalendarEvent = {
  title: string;
  date: string;
  notes: string;
  region: string;
  language: string;
};
