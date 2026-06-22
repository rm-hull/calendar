import { StartDay } from "./start-day";

export const TOASTER_ID = "settings-toast";

export interface GeneralSettings {
  startDay?: StartDay;
  showTipsOnStartup?: boolean;
  showJournalOnStartup?: boolean;
  showBackgroundColorForWeekend?: boolean;
}
