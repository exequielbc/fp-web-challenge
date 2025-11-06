import { Flex, Link } from "@radix-ui/themes";
import NextLink from "next/link";

export default function Home() {
  return (
    <Flex direction="column">
      <Link href="/checkin" asChild>
        <NextLink href="/checkin">Check in to a facility</NextLink>
      </Link>
    </Flex>
  );
}
