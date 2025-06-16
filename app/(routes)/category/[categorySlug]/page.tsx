'use client'

import useGetCategoryProduct from "@/api/useGetCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation"
import SkeletonSchema from "@/components/skeleton-schema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";

export default function Page() {
  
  const params = useParams();
  const { categorySlug } = params;
  const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);
  
  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      {result !== null && !loading && (
        <h1 className="text-3xl font-medium">{result[0].category.categoryName}</h1>
      )}
      <Separator />

      <div className="sm:flex sm:justify-between">
        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10 w-full">
          {loading && (
            <div className="col-span-full flex justify-center w-full">
              <SkeletonSchema grid={3} />
            </div>
          )}
          {result !== null && !loading && (
            result.map((product: ProductType) => (
              <ProductCard key={product.id} product={product}/>
            ))
          )}
        </div>
      </div>
    </div>
  )
}