import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://byteconectividad.com.ar";
const siteUrl = new URL(rawSiteUrl.endsWith("/") ? rawSiteUrl : `${rawSiteUrl}/`);

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Byte Conectividad | Internet que llega más lejos",
  description:
    "Conectividad de alta velocidad para hogares, empresas y zonas rurales de Lincoln y la región.",
  keywords: [
    "internet Lincoln",
    "internet rural",
    "banda ancha",
    "internet simétrico",
    "zonas WiFi",
    "Byte Conectividad",
  ],
  alternates: {
    canonical: ".",
  },
  icons: {
    icon: "favicon.jpg",
    shortcut: "favicon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: ".",
    siteName: "Byte Conectividad",
    title: "Byte Conectividad | Conectividad que llega más lejos",
    description:
      "Internet estable, atención cercana y soluciones a medida para hogares, empresas y zonas rurales.",
    images: [
      {
        url: "og.png",
        width: 1732,
        height: 909,
        alt: "Byte Conectividad — Conectividad que llega más lejos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Byte Conectividad | Conectividad que llega más lejos",
    description:
      "Internet estable, atención cercana y soluciones a medida para hogares, empresas y zonas rurales.",
    images: ["og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
