import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davemerheje.com"),
  title: {
    default: "Dave Merheje",
    template: "%s · Dave Merheje",
  },
  description:
    "Dave Merheje — comedian. New special DAWUD out now. Tour dates, releases, and contact.",
  openGraph: {
    title: "Dave Merheje",
    description: "Comedian · DAWUD out now",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
