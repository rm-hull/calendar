import { CalendarEvents, CalendarEvent } from "./events";

type Region = {
  division: string;
  events: PublicHoliday[];
};

type PublicHoliday = {
  title: string;
  date: string;
  notes: string;
  bunting: boolean;
};

export type UkBankHolidays = Record<string, Region>;

export const govUkToEvents = (bankHolidays: UkBankHolidays): CalendarEvents => {
  return Object.values(bankHolidays).reduce(
    (events: CalendarEvents, region) => {
      region.events.forEach((holiday) => {
        const event: CalendarEvent = {
          title: holiday.title,
          date: holiday.date,
          notes: holiday.notes,
          region: region.division,
        };

        events[holiday.date] = [...(events[holiday.date] || []), event];
      });
      return events;
    },
    {}
  );
};
