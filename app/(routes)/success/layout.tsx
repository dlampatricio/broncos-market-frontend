import type { Metadata } from 'next';

const siteUrl = 'https://broncosmarket.vercel.app';
const ogImage = `${siteUrl}/og-image.png`;

export const metadata: Metadata = {
  title: 'Compra Exitosa',
  description:
    "Tu pedido ha sido procesado con éxito. Gracias por comprar en Bronco's Market. ¡Pronto recibirás tu combo en Cienfuegos!",
  alternates: {
    canonical: `${siteUrl}/success`,
  },
  openGraph: {
    title: "Compra Exitosa | Bronco's Market",
    description: 'Tu pedido ha sido procesado con éxito.',
    url: `${siteUrl}/success`,
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Compra Exitosa Bronco's Market" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Compra Exitosa | Bronco's Market",
    description: 'Tu pedido ha sido procesado con éxito.',
    images: [ogImage],
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
