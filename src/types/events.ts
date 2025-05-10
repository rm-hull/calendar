export type Events = Record<string, Event[]>;

export type Event = {
  title: string;
  date: string;
  notes: string;
  region: string;
};
