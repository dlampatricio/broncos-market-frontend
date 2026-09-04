import type { Metadata } from "next";

const siteUrl = "https://broncosmarket.vercel.app";
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora todos los productos disponibles en Bronco's Market. Combos, lácteos, cárnicos, bebidas y más. Envíos rápidos a Cienfuegos.",
  alternates: {
    canonical: `${siteUrl}/all-products`,
  },
  openGraph: {
    title: "Todos los Productos | Bronco's Market",
    description:
      "Explora todos los productos disponibles en Bronco's Market. Combos, lácteos, cárnicos, bebidas y más.",
    url: `${siteUrl}/all-products`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Bronco's Market Productos" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Productos | Bronco's Market",
    description: "Explora todos los productos disponibles en Bronco's Market.",
    images: [ogImage],
  },
};

export default function AllProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
