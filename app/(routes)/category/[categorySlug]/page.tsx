"use client";

import { useProductsByCategory } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import SkeletonSchema from "@/components/skeleton-schema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { PackageOpen } from "lucide-react";

export default function CategoryPage() {
  const params = useParams();
  const { categorySlug } = params as { categorySlug: string };
  const { data, isLoading, isError } = useProductsByCategory(categorySlug);

  const products = data?.data || [];
  const categoryName =
    products[0]?.category?.categoryName ||
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1).toLowerCase();

  const productsWithImages = products.filter(
    (p: ProductType) =>
      p.images &&
      p.images.length > 0 &&
      p.images.some((img) => img.formats?.medium?.url || img.formats?.small?.url)
  );

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h1 className="text-3xl font-medium text-center text-red-900 dark:text-red-500">
        {categoryName}
      </h1>
      <Separator />

      <div className="pt-6 grid sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <SkeletonSchema grid={1} variant="product" />
              </div>
            ))
          : isError || productsWithImages.length === 0
          ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <PackageOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-foreground">No hay productos disponibles</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Actualmente no tenemos productos con imágenes en esta categoría.
              </p>
            </div>
          )
          : productsWithImages.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
