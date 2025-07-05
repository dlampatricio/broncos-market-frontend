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

  const categoryName = result?.[0]?.category?.categoryName || 
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase();

  // Filtrar productos que tienen imágenes (al menos un formato con URL)
  const productsWithImages = result?.filter((product: ProductType) => 
    product.images && product.images.length > 0 && 
    product.images.some(img => 
      img.formats?.medium?.url || 
      img.formats?.small?.url
    )
  ) || [];

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium text-center">{categoryName}</h1>
      <Separator />

      {/* Grid de productos */}
      <div className="pt-6 grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <SkeletonSchema grid={1} variant="product" />
            </div>
          ))
        ) : !result || productsWithImages.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
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
            <h3 className="text-lg font-medium text-foreground">
              No hay productos disponibles
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Actualmente no tenemos productos con imágenes en esta categoría.
            </p>
          </div>
        ) : (
          productsWithImages.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}