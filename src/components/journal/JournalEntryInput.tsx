import { useJournal } from "@/hooks/useJournal";
import { Box, Textarea, Button, VStack, HStack, TagsInput } from "@chakra-ui/react";
import { useState } from "react";
import { LuSend } from "react-icons/lu";

interface JournalEntryInputProps {
  date: string;
}

export function JournalEntryInput({ date }: JournalEntryInputProps) {
  const { addEntry } = useJournal();
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = () => {
    if (!content.trim()) return;

    addEntry(date, content, tags);
    setContent("");
    setTags([]);
  };

  return (
    <VStack align="stretch" gap={3}>
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
      />

      <HStack justify="space-between">
        <Box flex="1">
          <TagsInput.Root value={tags} onValueChange={(details) => setTags(details.value)} size="sm">
            <TagsInput.Control>
              <TagsInput.Items />
              <TagsInput.Input placeholder="Add tag..." />
            </TagsInput.Control>
          </TagsInput.Root>
        </Box>
        <Button size="sm" variant="subtle" colorPalette="orange" onClick={handleSubmit} disabled={!content.trim()}>
          Post <LuSend />
        </Button>
      </HStack>
    </VStack>
  );
}
