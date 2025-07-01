/* eslint-disable @next/next/no-img-element */
"use client"

import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import SkeletonSchema from "./skeleton-schema";
import { ProductType } from "@/types/product";
import { Card, CardContent } from "./ui/card";
import { ResponseType } from "@/types/response";
import { Expand, ShoppingCart } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/hooks/use-cart";

const FeaturedProducts = () => {
  
  const { loading,result }: ResponseType = useGetFeaturedProducts()
  const router = useRouter()
  const { addItem } = useCart()

  return ( 
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 text-3xl sm:pb-8">Productos Destacados</h3>
      <Carousel opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {loading ? (
            <SkeletonSchema grid={3}/>
          ) : !result || result.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center w-full py-12 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400 mb-4"
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
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">No se pudieron cargar los productos</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                No hay productos destacados disponibles en este momento.
              </p>
            </div>
          ) : (
            result.map((product: ProductType) => {

              return (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 group">
                  <div className="p-1">
                    <Card className="py-4 border border-gray-200 shadow-none">
                      <CardContent className="relative flex items-center justify-center px-6 py-2">
                        <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`} alt="Image featured"/>
                        <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                          <div className="flex justify-center gap-x-6">
                            <IconButton 
                            onClick={ () => router.push(`product/${product.slug}`)} 
                            icon={<Expand size={20}/>}
                            className="text-gray-600"/>
                            <IconButton 
                            onClick={ () => addItem(product)} 
                            icon={<ShoppingCart size={20}/>}
                            className="text-gray-600"/>
                          </div>
                        </div>
                      </CardContent>
                      <div className="flex justify-between gap-4 px-8">
                        <h3 className="text-lg font-bold">&quot;{product.productName}&quot;</h3>
                        <div className="flex items-center justify-between gap-3">
                          <p className="px-2 py-1 text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">{formatPrice(product.price)}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              )
            })
          )}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext className="hidden sm:flex"/>
      </Carousel>
    </div>
   );
}
 
export default FeaturedProducts;