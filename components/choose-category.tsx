"use client"

/* eslint-disable @next/next/no-img-element */
import { useGetCategories } from "@/api/useGetCategories";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";
import SkeletonSchema from "./skeleton-schema";

const ChooseCategory = () => {
  const {result, loading}: ResponseType = useGetCategories();

  return ( 
    <div className="max-w-6xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">Elige Tu Categoría Favorita</h3>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <SkeletonSchema grid={3} variant="category"/>
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
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No se pudieron cargar las categorías</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No hay categorías disponibles en este momento. Por favor intenta más tarde.
            </p>
          </div>
        ) : (
            result.map((category: CategoryType) => (
              <Link key={category.id} 
              href={`/category/${category.slug}`}
              className="relative max-w-xs mx-auto overflow-hidden bg-no-repeat bg-cover rounded-lg">
                <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${category.homeImage.url}`}
                alt={category.categoryName}
                className="max-w-[270px] transition-duration-300 ease-in-out rounded-lg hover:scale-110"/>
                <p className="absolute w-full text-lg font-bold text-center text-white bottom-2 py-3 backdrop-blur-md">{category.categoryName}</p>
              </Link>
            ))
          )} 
        </div>
    </div>
   );
}
 
export default ChooseCategory;