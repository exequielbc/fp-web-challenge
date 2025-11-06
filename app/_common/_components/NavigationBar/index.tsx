import { EnterIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import styles from "./styles.module.css";

export function NavigationBar() {
  return (
    <Flex
      asChild
      align="center"
      className={styles.navigationBarRoot}
      p="4"
      gap="4"
    >
      <nav>
        <EnterIcon width="1.5rem" height="1.5rem" color="blue" />
        <Flex direction="column">
          <Text size="5">Facilities check in</Text>
          <Text size="3">Use your camera or type in a code to check in</Text>
        </Flex>
      </nav>
    </Flex>
  );
}
