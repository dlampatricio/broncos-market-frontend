import type { Metadata } from "next";

const siteUrl = "https://broncosmarket.vercel.app";
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: "Carrito",
  description:
    "Tu carrito de compras en Bronco's Market. Revisa tus productos y finaliza tu pedido para recibirlos en Cienfuegos.",
  alternates: {
    canonical: `${siteUrl}/cart`,
  },
  openGraph: {
    title: "Carrito | Bronco's Market",
    description: "Tu carrito de compras en Bronco's Market.",
    url: `${siteUrl}/cart`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Carrito Bronco's Market" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carrito | Bronco's Market",
    description: "Tu carrito de compras en Bronco's Market.",
    images: [ogImage],
  },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
