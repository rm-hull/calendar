import { Tooltip } from "@/components/ui/tooltip";
import { Button, ButtonGroup, CloseButton, DatePicker, DateValue, Dialog, IconButton } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { LuMoveHorizontal } from "react-icons/lu";

interface MoveButtonProps {
  onMove: (newDate: Date) => void;
}

export function MoveButton({ onMove }: MoveButtonProps) {
  const [newDate, setNewDate] = useState<DateValue[]>([]);

  const handleMove = useCallback(() => {
    if (newDate.length === 1) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      onMove(newDate[0].toDate(timezone));
    }
  }, [newDate, onMove]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton aria-label="Move entry" variant="subtle" size="xs">
          <Tooltip content="Move entry">
            <LuMoveHorizontal />
          </Tooltip>
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content width="xs">
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
          <Dialog.Header>
            <Dialog.Title>Pick date to move entry</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body justifyItems="center">
            <DatePicker.Root
              size="xs"
              value={newDate}
              onValueChange={(e) => setNewDate(e.value)}
              inline
              hideOutsideDays
              width="fit-content"
            >
              <DatePicker.Content unstyled>
                <DatePicker.View view="day">
                  <DatePicker.Header />
                  <DatePicker.DayTable />
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Header />
                  <DatePicker.MonthTable />
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Header />
                  <DatePicker.YearTable />
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Root>
          </Dialog.Body>
          <Dialog.Footer>
            <ButtonGroup>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button
                type="submit"
                onClick={handleMove}
                variant="subtle"
                colorPalette="orange"
                disabled={newDate.length === 0}
              >
                Move
              </Button>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
