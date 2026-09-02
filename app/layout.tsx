import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Raze — Music that hits different",
  description:
    "Raze is a free Discord music bot with lossless audio, DSP filters, and zero limits. Burn through the silence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
