import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code Explorers Academy",
  description:
    "Live, fun coding classes for kids — Scratch, Python, App Inventor, p5.js, and Robotics.",
  icons: {
    icon: [
      { url: "/favicon.ico" }, // best for browser tab
      { url: "/images/favicon.png", type: "image/png" }, // fallback
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}