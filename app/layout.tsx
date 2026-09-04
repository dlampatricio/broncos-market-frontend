import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://broncosmarket.vercel.app";
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "Bronco's Market | Combos frescos a tu puerta en Cienfuegos",
    template: "%s | Bronco's Market",
  },
  description:
    "Combos, lácteos, cárnicos, bebidas y más. Lo esencial llega a tu puerta en Cienfuegos. Pedidos por WhatsApp con envío rápido.",
  keywords: ["broncos market", "combos", "cienfuegos", "delivery", "supermercado online", "lácteos", "cárnicos"],
  authors: [{ name: "Bronco's Market" }],
  creator: "Bronco's Market",
  openGraph: {
    type: "website",
    locale: "es_CU",
    url: siteUrl,
    siteName: "Bronco's Market",
    title: "Bronco's Market | Combos frescos a tu puerta en Cienfuegos",
    description:
      "Combos, lácteos, cárnicos, bebidas y más. Lo esencial llega a tu puerta en Cienfuegos.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Bronco's Market - Combos frescos en Cienfuegos",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bronco's Market | Combos frescos a tu puerta en Cienfuegos",
    description:
      "Combos, lácteos, cárnicos, bebidas y más. Lo esencial llega a tu puerta en Cienfuegos.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${urbanist.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
