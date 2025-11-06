"use client";

import { CameraIcon, Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import NextLink from "next/link";

import { checkUserIntoFacility } from "./checkUserIntoFacility";

const VIDEO_FEED_DOM_ID = "fp-facilities-checkin-qr-code-video-feed";

export default function CheckinPage() {
  const { startCamera, decodedQrCodeText } = useQrCodeScanner();
  const manualInputId = useId();

  const [manualConfirmationCode, setManualConfirmationCode] =
    useState<string>("");

  const [checkingIn, setCheckingIn] = useState(false);

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" wrap="wrap">
        <Heading size="6">Check in to a facility</Heading>
        <Tooltip content="Go home">
          <NextLink href="/" aria-label="Go home">
            <IconButton radius="full" variant="soft">
              <Cross1Icon />
            </IconButton>
          </NextLink>
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

          <Flex direction="column" gap="2">
            <Button onClick={startCamera}>
              <CameraIcon /> Start camera
            </Button>
            <Text size="4" color="gray" align="center">
              or
            </Text>
            <Text as="label" htmlFor={manualInputId} size="3">
              Enter facility code manually
            </Text>
            <TextField.Root
              id={manualInputId}
              placeholder="e.g. facility-001"
              value={manualConfirmationCode}
              onChange={(e) => setManualConfirmationCode(e.currentTarget.value)}
            >
              <TextField.Slot>
                <Pencil1Icon />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </Flex>
      </Card>

      <Text size="6">QR Code text: {decodedQrCodeText}</Text>

      <Button
        loading={checkingIn}
        disabled={checkingIn}
        onClick={async () => {
          const facilityId = manualConfirmationCode || decodedQrCodeText;
          if (!facilityId) {
            return;
          }
          setCheckingIn(true);
          await checkUserIntoFacility({
            userId: "user-123", // TODO: use real user ID
            facilityId,
          }).finally(() => setCheckingIn(false));
        }}
      >
        Check in
      </Button>

      <Box id={VIDEO_FEED_DOM_ID} width="80dvw" />
    </Flex>
  );
}

const useQrCodeScanner = () => {
  const [decodedQrCodeText, setDecodedResult] = useState<string | null>(null);
  const codeScannerRef = useRef<Html5QrcodeScanner>(null);

  useEffect(() => {
    if (!codeScannerRef.current) {
      codeScannerRef.current = new Html5QrcodeScanner(
        VIDEO_FEED_DOM_ID,
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
    }
  }, []);

  const startCamera = useCallback(() => {
    setDecodedResult(null);
    codeScannerRef.current?.render(
      (decodedText, decodedResult) => {
        setDecodedResult(decodedText);
        codeScannerRef.current?.clear(); // close camera
      },
      (error) => {
        // this is noisy, e.g. if first couple frames don't have a QR code
        //  this will have "errors"
        //  For now, let's swallow these to prevent noise in monitoring
      }
    );
  }, []);

  return { startCamera, decodedQrCodeText };
};
