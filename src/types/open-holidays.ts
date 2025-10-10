import { CalendarEvent, CalendarEvents } from "./events";

export type HolidayResponse = {
  id: string;
  name: LocalizedText[];
  startDate: Date;
  endDate?: Date;
  nationwide: boolean;
  comment?: string;
  subdivisions: SubdivisionReference[];
  regionalScope: "National" | "Regional" | "Local";
  temporalScope: "FullDay" | "HalfDay";
  type: "Public" | "Bank" | "Optional" | "School" | "BackToSchool" | "EndOfLessons";
};

type LocalizedText = {
  language: string;
  text: string;
};

type SubdivisionReference = {
  code: string;
  shortName: string;
};

export const openHolidaysToEvents = (holidays: HolidayResponse[], language: string): CalendarEvents => {
  return holidays.reduce((acc: CalendarEvents, holiday) => {
    const endDate = holiday.endDate ? new Date(holiday.endDate) : new Date(holiday.startDate);
    const currentDate = new Date(holiday.startDate);

    while (currentDate <= endDate) {
      const dateString = currentDate.toISOString().split("T")[0];

      const calendarEvent: CalendarEvent = {
        title: holiday.name[0].text,
        date: dateString,
        notes: holiday.comment || "",
        region: holiday.regionalScope,
        language,
      };

      if (acc[dateString]) {
        acc[dateString].push(calendarEvent);
      } else {
        acc[dateString] = [calendarEvent];
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return acc;
  }, {});
};
