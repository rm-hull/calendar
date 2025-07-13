export type StartDay = "sun" | "mon";

export function isStartDay(text: unknown): text is StartDay {
  switch (text?.toString()?.trim()?.toLowerCase()) {
    case "mon":
    case "sun":
      return true;
    default:
      return false;
  }
}
