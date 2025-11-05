"use client";

import { CameraIcon, Cross1Icon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useCallback, useEffect, useRef, useState } from "react";

const VIDEO_FEED_DOM_ID = "fp-facilities-checkin-qr-code-video-feed";

export default function CheckinPage() {
  const { startCamera, decodedResult } = useQrCodeScanner();

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

          <Button onClick={startCamera}>
            <CameraIcon /> Start camera
          </Button>
        </Flex>
      </Card>

      <Text size="6">{decodedResult}</Text>

      <Box id={VIDEO_FEED_DOM_ID} width="80dvw" />
    </Flex>
  );
}

const useQrCodeScanner = () => {
  const [decodedResult, setDecodedResult] = useState<string | null>(null);
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

  return { startCamera, decodedResult };
};
