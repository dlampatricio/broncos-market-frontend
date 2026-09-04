"use client";

import { useCategories } from "@/lib/api";
import { CategoryType } from "@/types/category";
import Link from "next/link";
import SkeletonSchema from "./skeleton-schema";
import OptimizedImage from "./optimized-image";
import { PackageOpen } from "lucide-react";

const ChooseCategory = () => {
  const { data, isLoading, isError } = useCategories();
  const categories = data?.data || [];

  if (isLoading) {
    return (
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-red-900 dark:text-red-500 mb-8 text-center">
          Elige Tu Categoría Favorita
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonSchema key={i} grid={1} variant="category" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || categories.length === 0) {
    return (
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-red-900 dark:text-red-500 mb-8 text-center">
          Elige Tu Categoría Favorita
        </h3>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <PackageOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No se pudieron cargar las categorías</h3>
          <p className="mt-1 text-sm text-muted-foreground">Intenta más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
      <h3 className="text-3xl font-bold text-red-900 dark:text-red-500 mb-8 text-center">
        Elige Tu Categoría Favorita
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category: CategoryType) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative block overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-900"
          >
            <div className="relative w-full aspect-video">
              <div className="relative block sm:hidden w-full h-full">
                <OptimizedImage
                  src={category.mainImage.formats?.medium?.url || category.mainImage.url}
                  alt={category.categoryName}
                  fill
                  sizes="100vw"
                />
              </div>
              <div className="relative hidden sm:block w-full h-full">
                <OptimizedImage
                  src={category.homeImage.formats?.medium?.url || category.homeImage.url}
                  alt={category.categoryName}
                  fill
                  sizes="(min-width: 768px) 33vw"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-xl font-bold text-white sm:group-hover:text-red-300 transition-colors duration-300">
                {category.categoryName}
              </h3>
              <span className="inline-block mt-1 text-sm font-medium text-white sm:text-red-300 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Explorar →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChooseCategory;
