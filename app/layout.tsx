import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FP facilities check in",
  description: "An app to check into fitness facilities using Fitness Passport",
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
