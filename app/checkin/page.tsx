import { CameraIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";

export default function CheckinPage() {
  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" wrap="wrap">
        <Heading size="6">Check in to a facility</Heading>
        <Tooltip content="Go home">
          <IconButton aria-label="Go home" radius="full" variant="soft">
            <Cross1Icon />
          </IconButton>
        </Tooltip>
      </Flex>

      <Card>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2" align="center">
            <CameraIcon height="2rem" width="2rem" />
            <Text size="5">Scan facility QR code</Text>
            <Text size="4" color="gray">
              Point your camera at the facility's QR code to check in
            </Text>
          </Flex>

          <Button>
            <CameraIcon /> Start camera
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
