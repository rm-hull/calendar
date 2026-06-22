import { useColorModeValue } from "@/components/ui/color-mode";
import { useJournal } from "@/hooks/useJournal";
import { JournalEntry } from "@/types/journal";
import { Box, HStack, Text, VStack, Editable } from "@chakra-ui/react";
import { formatISO } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import TimeAgo from "react-time-ago";
import { useDebounce } from "react-use";
import { DeleteButton } from "./DeleteButton";
import { MoveButton } from "./MoveButton";

interface JournalEntryItemProps {
  entry: JournalEntry;
}

export function JournalEntryItem({ entry }: JournalEntryItemProps) {
  const { deleteEntry, updateEntry } = useJournal();
  const [updatedValue, setUpdatedValue] = useState(entry.content);
  const bgColor = useColorModeValue("bg.muted", "bg.muted");

  const handleMove = useCallback(
    (dt: Date) => {
      updateEntry(entry.id, { date: formatISO(dt, { representation: "date" }) });
    },
    [updateEntry, entry.id]
  );

  const handleDelete = useCallback(() => {
    deleteEntry(entry.id);
  }, [deleteEntry, entry.id]);

  useEffect(() => {
    queueMicrotask(() => setUpdatedValue(entry.content));
  }, [entry.content]);

  useDebounce(
    () => {
      if (updatedValue !== entry.content) {
        updateEntry(entry.id, { content: updatedValue });
      }
    },
    1000,
    [updatedValue]
  );

  return (
    <Box p={2} borderRadius="md" bg={bgColor} borderWidth="1px">
      <VStack align="stretch" gap={1}>
        <HStack justify="space-between">
          <Text as="span" fontSize="xs" color="fg.subtle">
            <TimeAgo date={new Date(entry.updatedAt ?? entry.createdAt)} locale="en-US" />
          </Text>
          <HStack gap={1}>
            <MoveButton onMove={handleMove} />
            <DeleteButton onDelete={handleDelete} />
          </HStack>
        </HStack>
        <Editable.Root
          fontSize="sm"
          whiteSpace="pre-wrap"
          value={updatedValue}
          onValueChange={(e) => setUpdatedValue(e.value)}
          placeholder="Click to edit"
        >
          <Editable.Preview />
          <Editable.Input />
        </Editable.Root>
        {entry.categories.length > 0 && (
          <HStack gap={1} mt={1}>
            {entry.categories.map((catId) => (
              <Text key={catId} fontSize="xs" bg="bg.subtle" px={1} borderRadius="sm">
                #{catId}
              </Text>
            ))}
          </HStack>
        )}
      </VStack>
    </Box>
  );
}
