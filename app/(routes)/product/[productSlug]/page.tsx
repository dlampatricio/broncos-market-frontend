"use client"

import useGetProductBySlug from "@/api/useGetProductBySlug";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation"
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel.product";
import InfoProduct from "./components/info-product";

export default function Page () {
  
  const params = useParams()
  const { productSlug } = params;

  const { result }: ResponseType = useGetProductBySlug(productSlug)

  if (result == null){
    return <SkeletonProduct />
  }

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24">
      <div className="grid sm:grid-cols-2">
        <div className="py-6">
          <CarouselProduct images={result[0].images} />
        </div>
        <div>
          <InfoProduct product={result[0]} />
        </div>
      </div>
    </div>
  )
}