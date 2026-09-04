import type { Metadata } from "next";

const siteUrl = "https://broncosmarket.vercel.app";
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: "Favoritos",
  description:
    "Tus productos favoritos guardados en Bronco's Market. Guarda lo que más te gusta para comprarlo después.",
  alternates: {
    canonical: `${siteUrl}/loved-products`,
  },
  openGraph: {
    title: "Favoritos | Bronco's Market",
    description: "Tus productos favoritos guardados en Bronco's Market.",
    url: `${siteUrl}/loved-products`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Favoritos Bronco's Market" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Favoritos | Bronco's Market",
    description: "Tus productos favoritos guardados en Bronco's Market.",
    images: [ogImage],
  },
};

export default function LovedProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
