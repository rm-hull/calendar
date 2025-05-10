import { Events, Event } from "../types/events";

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

export const govUkToEvents = (bankHolidays: UkBankHolidays): Events => {
  return Object.values(bankHolidays).reduce((events: Events, region) => {
    region.events.forEach((holiday) => {
      const event: Event = {
        title: holiday.title,
        date: holiday.date,
        notes: holiday.notes,
        region: region.division,
      };

      events[holiday.date] = [...(events[holiday.date] || []), event];
    });
    return events;
  }, {});
};
