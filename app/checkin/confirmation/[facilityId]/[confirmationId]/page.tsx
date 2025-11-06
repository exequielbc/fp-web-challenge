import { getFacilities } from "@/app/utils/getFacilities";
import { Cross1Icon } from "@radix-ui/react-icons";
import {
  Badge,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { notFound } from "next/navigation";
import NextLink from "next/link";

interface ConfirmationPageProps
  extends PageProps<"/checkin/confirmation/[facilityId]/[confirmationId]"> {}

const facilities = getFacilities();

export default async function ConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { facilityId, confirmationId } = await params;
  const facility = facilities.find((f) => f.id === facilityId);
  if (!facility) {
    return notFound();
  }

  // TODO: extra authorisation logic would go here
  //   e.g. check if confirmation code is valid for facility, etc

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" wrap="wrap">
        <Heading size="6">You've checked into {facility.name}</Heading>
        <Tooltip content="Go home">
          <NextLink href="/" aria-label="Go home">
            <IconButton radius="full" variant="soft">
              <Cross1Icon />
            </IconButton>
          </NextLink>
        </Tooltip>
      </Flex>

      <Flex wrap="wrap" gap="2">
        {facility.facilities.map((facilityFeature, index) => (
          // using index as key as facility featrure may not be unique in data
          <Badge key={index}>{facilityFeature}</Badge>
        ))}
      </Flex>
      <Text align="center">Your confirmation code is</Text>
      <Text align="center" size="5" color="blue">
        {confirmationId}
      </Text>
    </Flex>
  );
}
