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
  const { categorySlug } = params as { categorySlug: string };
  const { result, loading }: ResponseType = useGetCategoryProduct(categorySlug);

  const categoryName = result?.[0]?.category?.categoryName || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase();

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium">{categoryName}</h1>
      <Separator />

      <div className="sm:flex sm:justify-between">
        <div className="grid gap-5 mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10 w-full">
          {loading ? (
            <div className="col-span-full flex justify-center w-full">
              <SkeletonSchema grid={3} />
            </div>
          ) : !result || result.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
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
              <h3 className="text-lg font-medium text-gray-900">No hay productos disponibles</h3>
              <p className="mt-1 text-sm text-gray-500">
                Actualmente no tenemos productos en esta categoría. Prueba con otra categoría.
              </p>
            </div>
          ) : (
            result.map((product: ProductType) => (
              <ProductCard key={product.id} product={product}/>
            ))
          )}
        </div>
      </div>
    </div>
  )
}