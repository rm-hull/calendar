import Backdrop from "@/components/Backdrop";
import { OnThisDayEvent } from "@/types/wikimedia";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Tabs, Text } from "@chakra-ui/react";
import WikimediaEvent from "@/components/WikimediaEvent";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useColorModeValue } from "@/components/ui/color-mode";
import { fetchOnThisDay } from "@/services/on-this-day";

export const Route = createFileRoute("/calendar/on-this-day/$month/$day")({
  component: RouteComponent,
  loader: (context) => fetchOnThisDay(context.params.month, context.params.day),
  pendingMs: 100,
  pendingComponent: () => <Backdrop>Loading...</Backdrop>,
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
          {Object.keys(onThisDay).map((tab, index) => (
            <Tabs.Trigger
              key={`tab_trigger_${index}`}
              value={tab}
              onClick={scrollToTopOfPage}
            >
              <Text textTransform="capitalize">{tab}</Text>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {Object.keys(onThisDay).map((tab, index) => (
          <Tabs.Content key={`tab_content_${index}`} value={tab}>
            <Container margin="0 auto" maxWidth="container.xl">
              <ResponsiveMasonry>
                <Masonry>
                  {((onThisDay as never)[tab] as OnThisDayEvent[]).map(
                    (event, index) => (
                      <WikimediaEvent key={index} {...event} />
                    )
                  )}
                </Masonry>
              </ResponsiveMasonry>
            </Container>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Backdrop>
  );
}
