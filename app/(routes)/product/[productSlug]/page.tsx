"use client";

import { useProductBySlug } from "@/lib/api";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel.product";
import InfoProduct from "./components/info-product";
import { PackageOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const params = useParams();
  const { productSlug } = params as { productSlug: string };
  const { data, isLoading, isError } = useProductBySlug(productSlug);

  if (isLoading) return <SkeletonProduct />;

  if (isError || !data?.data?.[0]) {
    return (
      <div className="max-w-6xl py-32 mx-auto sm:px-24 flex flex-col items-center justify-center text-center">
        <PackageOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Producto no encontrado</h1>
        <p className="text-muted-foreground mb-6">
          El producto que buscas no existe o fue eliminado.
        </p>
        <Link href="/all-products">
          <Button>Explorar productos</Button>
        </Link>
      </div>
    );
  }

  const product = data.data[0];

  const productUrl = `https://broncosmarket.vercel.app/product/${product.slug}`;
  const imageUrl = product.images?.[0]?.formats?.medium?.url || product.images?.[0]?.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.productName,
    description: product.description,
    image: imageUrl ? [imageUrl] : [],
    url: productUrl,
    sku: product.slug,
    brand: {
      "@type": "Brand",
      name: "Bronco's Market",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "CUP",
      price: product.price,
      availability: product.active ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Bronco's Market",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
        <div className="grid sm:grid-cols-2">
          <div className="py-6">
            <CarouselProduct images={product.images} productName={product.productName} />
          </div>
          <div>
            <InfoProduct product={product} />
          </div>
        </div>
      </div>
    </>
  );
}
