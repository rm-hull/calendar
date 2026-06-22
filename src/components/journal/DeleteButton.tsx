import { Tooltip } from "@/components/ui/tooltip";
import { Button, ButtonGroup, CloseButton, Dialog, IconButton } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

interface DeleteDialogProps {
  onDelete: () => void;
}

export function DeleteButton({ onDelete }: DeleteDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton aria-label="Delete entry" variant="ghost" size="xs" colorPalette="red">
          <Tooltip content="Delete">
            <FiTrash2 />
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
            <Dialog.Title>Confirm delete?</Dialog.Title>
          </Dialog.Header>
          <Dialog.Footer>
            <ButtonGroup>
              <Dialog.ActionTrigger asChild>
                <Button variant="subtle">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button type="submit" onClick={onDelete} variant="subtle" colorPalette="red">
                Delete
              </Button>
            </ButtonGroup>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
