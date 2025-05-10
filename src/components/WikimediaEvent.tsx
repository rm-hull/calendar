import { OnThisDayEvent } from "@/types/wikimedia";
import { Card, Heading, Image, Link, Text } from "@chakra-ui/react";
import { Fragment } from "react";

type EventProps = Pick<OnThisDayEvent, "year" | "text" | "pages">;

export default function WikimediaEvent({ year, text, pages }: EventProps) {
  return (
    <Card.Root width={400}>
      <Card.Header p={2}>
        <Heading fontSize="lg" fontWeight="bold" color="gray.500">
          {year && (year < 0 ? `${-year} BC` : year)}
        </Heading>
        <Text>{text}</Text>
      </Card.Header>
      <Card.Body p={2}>
        {pages.slice(0, 1).map((page, index) => (
          <Fragment key={index}>
            {page.thumbnail && (
              <Image src={page.thumbnail.source} width={400} />
            )}
            <Text fontSize="sm">
              {page.extract}{" "}
              <Link
                href={page.content_urls.desktop.page}
                fontSize="xs"
                color="blue.500"
              >
                [source]
              </Link>
            </Text>
          </Fragment>
        ))}
      </Card.Body>
    </Card.Root>
  );
}
