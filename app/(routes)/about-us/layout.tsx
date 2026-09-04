import type { Metadata } from "next";

const siteUrl = "https://broncosmarket.vercel.app";
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Conoce más sobre Bronco's Market. Somos tu aliado en la cocina diaria, llevando lo mejor de la gastronomía cubana a tu hogar en Cienfuegos.",
  alternates: {
    canonical: `${siteUrl}/about-us`,
  },
  openGraph: {
    title: "Sobre Nosotros | Bronco's Market",
    description:
      "Somos tu aliado en la cocina diaria, llevando lo mejor de la gastronomía cubana a tu hogar.",
    url: `${siteUrl}/about-us`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Sobre Bronco's Market" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Nosotros | Bronco's Market",
    description: "Conoce más sobre Bronco's Market.",
    images: [ogImage],
  },
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
