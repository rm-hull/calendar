import { Event } from "@/types/events";
import { PropsWithChildren } from "react";
import { Tooltip } from "./ui/tooltip";

type EventsTooltipProps = {
  events?: Event[];
};

function blurb(event: { title: string; regions: string }) {
  return `${event.title} (${event.regions})`;
}

export default function EventsTooltip({
  children,
  events: originalEvents,
}: PropsWithChildren<EventsTooltipProps>) {
  if (!originalEvents) {
    return children;
  }

  const events = Object.values(
    originalEvents.reduce(
      (acc: { [key: string]: { title: string; regions: string[] } }, event) => {
        if (!acc[event.title]) {
          acc[event.title] = { title: event.title, regions: [event.region] };
        } else {
          acc[event.title].regions.push(event.region);
        }
        return acc;
      },
      {}
    )
  ).map((event) => ({ title: event.title, regions: event.regions.join(", ") }));

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
