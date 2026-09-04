import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bronco's Market | Combos frescos a tu puerta en Cienfuegos",
  description:
    "Combos, lácteos, cárnicos, bebidas y más. Lo esencial llega a tu puerta en Cienfuegos. Pedidos por WhatsApp con envío rápido.",
};

export default function Home() {
  return (
    <main>
      <CarouselTextBanner />
      <FeaturedProducts />
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}
