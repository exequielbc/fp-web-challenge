import { Flex, Text } from "@radix-ui/themes";
import Image from "next/image";
import QrCode from "qrcode";

import { getFacilities } from "@/app/utils/getFacilities";

interface FacilityQrCodePageProps {
  params: Promise<{ facilityId: string }>;
}

export default async function FacilityQrCodePage({
  params,
}: FacilityQrCodePageProps) {
  const { facilityId } = await params;
  const encodedData = facilityId;
  const dataUrl = await QrCode.toDataURL(encodedData, {
    width: 500,
  });
  return (
    <Flex direction="column" gap="4" align="center">
      <Text>Facility code: {facilityId}</Text>
      <Image
        src={dataUrl}
        alt={`A QR code for facility ${facilityId}`}
        width="500"
        height="500"
      />
    </Flex>
  );
}

export async function generateStaticParams() {
  const facilitiesData = getFacilities();
  return facilitiesData.map((facility) => ({ facilityId: facility.id }));
}
