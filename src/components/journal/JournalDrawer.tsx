import { toaster } from "@/components/ui/toaster";
import { useGeneralSettings } from "@/hooks/useGeneralSettings";
import { useJournal } from "@/hooks/useJournal";
import { TOASTER_ID } from "@/types/settings";
import { Box, Button, Drawer, HStack, Text, IconButton, VStack, Separator, Portal } from "@chakra-ui/react";
import { format, addDays, subDays, isSameDay, parseISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useKey } from "react-use";
import { JournalEntryInput } from "./JournalEntryInput";
import { JournalEntryItem } from "./JournalEntryItem";

const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export function JournalDrawer() {
  const { settings } = useGeneralSettings();
  const { entries } = useJournal();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (settings?.showJournalOnStartup) {
      queueMicrotask(() => setOpen(true));
    }
  }, [settings?.showJournalOnStartup]);

  useKey(
    (event) => (event.metaKey || event.ctrlKey) && event.key === "j",
    (event) => {
      toaster.dismiss(TOASTER_ID);
      event.preventDefault();
      setOpen((prev) => !prev);
    }
  );

  const navigateToDay = useCallback(
    (date: Date) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  const todayEntries = entries.filter((entry) => isSameDay(parseISO(entry.date), selectedDate));

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.CloseTrigger />
            <Drawer.Header pb={4}>
              <Drawer.Title>Journal</Drawer.Title>
              <HStack gap={1}>
                <IconButton
                  aria-label="Previous Day"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDay(subDays(selectedDate, 1))}
                >
                  <LuChevronLeft />
                </IconButton>
                <Button variant="ghost" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <IconButton
                  aria-label="Next Day"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateToDay(addDays(selectedDate, 1))}
                >
                  <LuChevronRight />
                </IconButton>
              </HStack>
            </Drawer.Header>
            <Drawer.Body pb={24}>
              <VStack align="stretch" gap={4}>
                <HStack justify="space-between" mb={2}>
                  <Text fontWeight="bold" fontSize="md">
                    {format(selectedDate, "PPPP")}
                  </Text>
                </HStack>

                <Separator />

                <Box minH="200px">
                  {todayEntries.length === 0 ? (
                    <Text color="fg.muted" textAlign="center" mt={10}>
                      No entries for this day.
                    </Text>
                  ) : (
                    <VStack align="stretch" gap={3}>
                      {todayEntries.map((entry) => (
                        <JournalEntryItem key={entry.id} entry={entry} />
                      ))}
                    </VStack>
                  )}
                </Box>
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <JournalEntryInput date={formatDate(selectedDate)} />
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
