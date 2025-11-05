import type { Metadata, Viewport } from "next";
import "./globals.css";
import { type ReactNode } from "react";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
