import { Alert, Code, Container, Heading } from "@chakra-ui/react";
import { ErrorComponentProps } from "@tanstack/react-router";

export function ErrorFallback({ error }: ErrorComponentProps) {
  return (
    <Container mt={8}>
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>Something went wrong:</Alert.Title>
        <Alert.Description>
          <strong>{error.message}</strong>
        </Alert.Description>
      </Alert.Root>

      <Container m={5}>
        <Heading size="sm">Stack trace</Heading>
        <Code background="none">
          <pre>{error.stack}</pre>
        </Code>
      </Container>
    </Container>
  );
}
