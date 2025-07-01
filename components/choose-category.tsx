/* eslint-disable @next/next/no-img-element */
"use client"

import { useGetCategories } from "@/api/useGetCategories";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";
import SkeletonSchema from "./skeleton-schema";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center sm:text-left">
        Elige Tu Categoría Favorita
      </h3>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <SkeletonSchema grid={3} variant="category" />
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No se pudieron cargar las categorías
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No hay categorías disponibles en este momento. Por favor intenta más tarde.
            </p>
          </div>
        ) : (
          result.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-900"
            >
              <div className="aspect-w-16 aspect-h-9 w-full">
                <img
                  src={`${category.homeImage.formats.medium.url}`}
                  alt={category.categoryName}
                  className="object-cover w-full h-full rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-bold text-white group-hover:text-red-300 transition-colors duration-300">
                  {category.categoryName}
                </h3>
                <span className="inline-block mt-1 text-sm font-medium text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explorar →
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ChooseCategory;