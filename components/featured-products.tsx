/* eslint-disable @next/next/no-img-element */
"use client"

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeleton-schema";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";

const FeaturedProducts = () => {
  const { loading, result }: ResponseType = useGetFeaturedProducts()
  const router = useRouter()
  const { addItem } = useCart()

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="text-3xl font-bold text-foreground mb-8 text-center sm:text-left">
        Productos Destacados
      </h3>
      
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="md:-ml-4">
          {loading ? (
            Array.from({length: 3}).map((_, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-0 sm:p-1">
                  <SkeletonSchema grid={1} variant="product"/>
                </div>
              </CarouselItem>
            ))
          ) : !result || result.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center w-full py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-muted-foreground mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-foreground">No se pudieron cargar los productos</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                No hay productos destacados disponibles en este momento.
              </p>
            </div>
          ) : (
            result.map((product: ProductType) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-0 sm:p-1">
                  <div className="group relative block overflow-hidden sm:rounded-lg border-0 sm:border border-border">
                    {/* Image with hover container */}
                    <div className="relative overflow-hidden bg-muted transition-transform duration-300 sm:group-hover:scale-[1.02] sm:group-hover:shadow-md">
                      <img 
                        src={`${product.images[0].formats.small.url}`} 
                        alt={product.productName}
                        className="object-cover w-full"
                        loading="lazy"
                      />
                      {/* Gradient overlay - solo visible en desktop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Centered action buttons - solo visibles en desktop */}
                      <div className="absolute inset-0 hidden sm:flex items-center justify-center gap-4 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                        <IconButton 
                          onClick={() => router.push(`product/${product.slug}`)} 
                          icon={<Expand size={20}/>}
                          className="text-gray-600"
                        />
                        <IconButton 
                          onClick={() => addItem(product)} 
                          icon={<ShoppingCart size={20}/>}
                          className="text-gray-600"
                        />
                      </div>
                    </div>
                    {/* Product info */}
                    <div className="p-4 sm:px-4 sm:py-2">
                      <div className="flex justify-between items-start">
                        <Link 
                          href={`product/${product.slug}`} 
                          className="text-lg font-bold hover:text-primary transition-colors duration-200"
                        >
                          {product.productName}
                        </Link>
                        <p className="px-3 py-1 text-sm font-medium text-white bg-red-900 rounded-full">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}

export default FeaturedProducts;
