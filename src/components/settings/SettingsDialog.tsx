import { useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Icon,
  Kbd,
  Portal,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useKey } from "react-use";
import { SettingsForm } from "./SettingsForm";
import { About } from "./About";
import { License } from "./License";
import { useGeneralSettings } from "@/hooks/useGeneralSettings";

const TOASTER_ID = "settings-toast";

function ToastDescription() {
  const isMac = navigator.platform.toLowerCase().includes("mac");
  const commandPrefix = isMac ? "⌘" : "CTRL";

  return (
    <HStack alignItems="start">
      <Icon size="md" color="blue.600">
        <IoInformationCircleSharp />
      </Icon>
      <Text>
        Settings can be accessed by pressing: <Kbd>CTRL</Kbd> +{" "}
        <Kbd>{commandPrefix}</Kbd>
      </Text>
    </HStack>
  );
}

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [settings] = useGeneralSettings();

  useKey(".", (event) => {
    if (event.metaKey || event.ctrlKey) {
      toaster.dismiss(TOASTER_ID);
      setOpen(true);
    }
  });

  useEffect(() => {
    if (!(settings?.showTipsOnStartup ?? true)) return;

    setTimeout(
      () =>
        toaster.create({
          id: TOASTER_ID,
          title: <ToastDescription />,
          type: "info",
          duration: 15_000,
          action: {
            label: "Open now",
            onClick: () => {
              setOpen(true);
            },
          },
        }),
      1_500
    );
  }, [settings?.showTipsOnStartup]);

  return (
    <Dialog.Root
      lazyMount
      size="lg"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior="inside"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Tabs.Root colorPalette="orange" defaultValue="settings">
              <Dialog.Header>
                <Dialog.Title width="100%">
                  <Tabs.List>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    <Tabs.Trigger value="about">About</Tabs.Trigger>
                    <Tabs.Trigger value="license">MIT License</Tabs.Trigger>
                  </Tabs.List>
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Tabs.Content value="settings">
                  <SettingsForm />
                </Tabs.Content>
                <Tabs.Content value="about">
                  <About />
                </Tabs.Content>
                <Tabs.Content value="license">
                  <License showHeading={false} />
                </Tabs.Content>
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="subtle" colorPalette="orange">
                    Close
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Tabs.Root>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
