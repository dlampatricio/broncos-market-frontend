import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o fue movida. Explora nuestros productos en Bronco's Market.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
