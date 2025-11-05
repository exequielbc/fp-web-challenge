import type { Metadata, Viewport } from "next";
import "./globals.css";
import { type ReactNode } from "react";
import { Container, ScrollArea, Theme, ThemePanel } from "@radix-ui/themes";
import { ToastProvider, ToastViewport } from "@radix-ui/react-toast";
import { ThemeProvider } from "next-themes";
import styles from "./layout.module.css";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "FP facilities check in",
  description: "An app to check into fitness facilities using Fitness Passport",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="blue">
            <ToastProvider>
              <Container p="2">
                {/* <NavigationBar mb="2" /> */}
                <ScrollArea scrollbars="vertical">{children}</ScrollArea>
              </Container>
              <Container className={styles.toastViewport} p="4">
                <ToastViewport />
              </Container>
            </ToastProvider>

            {process.env.NODE_ENV === "development" && (
              <ThemePanel defaultOpen={false} />
            )}
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
