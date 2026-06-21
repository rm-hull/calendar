import { useJournal } from "@/hooks/useJournal";
import { Box, HStack, Text, IconButton, VStack, Editable } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import { Tooltip } from "../ui/tooltip";
import { JournalEntry } from "@/types/journal";
import { useColorModeValue } from "../ui/color-mode";
import TimeAgo from "react-time-ago";
import { useDebounce } from "react-use";
import { useState } from "react";

interface JournalEntryItemProps {
  entry: JournalEntry;
}

export function JournalEntryItem({ entry }: JournalEntryItemProps) {
  const { deleteEntry, updateEntry } = useJournal();
  const [updatedValue, setUpdatedValue] = useState(entry.content)
  const bgColor = useColorModeValue("bg.muted", "bg.muted");

  const handleDelete = () => {
    if (confirm("Delete this entry?")) {
      deleteEntry(entry.id);
    }
  };

  useDebounce(
    () => updateEntry(entry.id, { content: updatedValue }),
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
            <Tooltip content="Delete">
              <IconButton aria-label="Delete entry" variant="ghost" size="xs" colorPalette="red" onClick={handleDelete}>
                <FiTrash2 />
              </IconButton>
            </Tooltip>
          </HStack>
        </HStack>
        <Editable.Root
          fontSize="sm" whiteSpace="pre-wrap"
          value={entry.content}
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
