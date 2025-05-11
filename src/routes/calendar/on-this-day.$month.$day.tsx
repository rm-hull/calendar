import Backdrop from "@/components/Backdrop";
import { OnThisDayCollection } from "@/types/wikimedia";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Progress, Tabs, Text } from "@chakra-ui/react";
import WikimediaEvent from "@/components/WikimediaEvent";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useColorModeValue } from "@/components/ui/color-mode";
import { fetchOnThisDay } from "@/services/wikimedia";

function PendingComponent() {
  const palette = useColorModeValue("orange", "gray");
  return (
    <Backdrop>
      <Progress.Root maxW="100hw" value={null} size="sm" colorPalette={palette}>
        <Progress.Label>Loading...</Progress.Label>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Backdrop>
  );
}

export const Route = createFileRoute("/calendar/on-this-day/$month/$day")({
  component: RouteComponent,
  loader: (context) => fetchOnThisDay(context.params.month, context.params.day),
  pendingMs: 100,
  pendingComponent: PendingComponent,
});

function RouteComponent() {
  const onThisDay = Route.useLoaderData();
  const scrollToTopOfPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Backdrop>
      <Tabs.Root defaultValue="selected">
        <Tabs.List
          position="sticky"
          top={0}
          background={useColorModeValue("orange.50", "gray.900")}
          zIndex={1}
        >
          {Object.keys(onThisDay).map((tab, index) => {
            const values = (onThisDay as never)[tab] as OnThisDayCollection;
            const disabled =
              (Array.isArray(values) && values.length === 0) ||
              Object.keys(values).length === 0;

            return (
              <Tabs.Trigger
                key={`tab_trigger_${index}`}
                value={tab}
                disabled={disabled}
                onClick={scrollToTopOfPage}
              >
                <Text textTransform="capitalize">{tab}</Text>
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {Object.keys(onThisDay).map((tab, index) => {
          const values = (onThisDay as never)[tab] as OnThisDayCollection;
          return (
            <Tabs.Content key={`tab_content_${index}`} value={tab}>
              <Container margin="0 auto" maxWidth="container.xl">
                <ResponsiveMasonry>
                  <Masonry>
                    {Array.isArray(values) ? (
                      values.map((event, index) => (
                        <WikimediaEvent key={index} {...event} />
                      ))
                    ) : (
                      <Text>No data</Text>
                    )}
                  </Masonry>
                </ResponsiveMasonry>
              </Container>
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </Backdrop>
  );
}
