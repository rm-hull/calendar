import { CalendarEvent } from "@/types/events";
import { PropsWithChildren } from "react";
import { Tooltip } from "./ui/tooltip";

type EventsTooltipProps = {
  events?: CalendarEvent[];
};

type EventGroup = Record<
  string,
  {
    title: string;
    language: string;
    regions: string[];
  }
>;

function blurb(event: EventGroup[string]): string {
  return `${event.title} (${event.language}: ${event.regions.join(", ")})`;
}

export default function EventsTooltip({
  children,
  events: originalEvents,
}: PropsWithChildren<EventsTooltipProps>) {
  if (!originalEvents) {
    return children;
  }

  const events = Object.values(
    originalEvents.reduce((acc: EventGroup, event) => {
      if (!acc[event.title]) {
        acc[event.title] = {
          title: event.title,
          language: event.language,
          regions: [event.region],
        };
      } else {
        acc[event.title].regions.push(event.region);
      }
      return acc;
    }, {})
  );

  const content = (
    <ul>
      {events.map((event, index) => (
        <li key={index}>{blurb(event)}</li>
      ))}
    </ul>
  );
  return (
    <Tooltip showArrow content={content}>
      {children}
    </Tooltip>
  );
}
