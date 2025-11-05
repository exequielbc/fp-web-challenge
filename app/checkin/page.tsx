import { Cross1Icon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton, Tooltip } from "@radix-ui/themes";

export default function CheckinPage() {
  return (
    <Flex direction="column">
      <Flex justify="between" wrap="wrap">
        <Heading size="6">Check in to a facility</Heading>
        <Tooltip content="Go home">
          <IconButton aria-label="Go home" radius="full" variant="soft">
            <Cross1Icon />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
