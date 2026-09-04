"use client";

import { useState, useMemo } from "react";
import { useProducts, useSearchProducts, useCategories } from "@/lib/api";
import { Separator } from "@/components/ui/separator";
import SkeletonSchema from "@/components/skeleton-schema";
import { ProductType } from "@/types/product";
import { CategoryType } from "@/types/category";
import { Input } from "@/components/ui/input";
import { Search, X, PackageOpen } from "lucide-react";
import ProductCard from "../category/[categorySlug]/components/product-card";
import useDebounce from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Pagination from "@/components/pagination";

const ITEMS_PER_PAGE = 12;

export default function AllProductsPage() {
  const { data: productsData, isLoading } = useProducts();
  const { data: categoriesData } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchQuery, 300);
  const { data: searchData, isLoading: searchLoading } = useSearchProducts(debouncedSearch);

  const categories = categoriesData?.data || [];

  const allFilteredProducts = useMemo(() => {
    const source = debouncedSearch ? searchData?.data : productsData?.data;
    if (!source) return [];
    let products = source.filter(
      (p: ProductType) =>
        p.images &&
        p.images.length > 0 &&
        p.images.some((img) => img.formats?.medium?.url || img.formats?.small?.url)
    );
    if (selectedCategory) {
      products = products.filter((p: ProductType) => p.category?.slug === selectedCategory);
    }
    return products;
  }, [productsData, searchData, debouncedSearch, selectedCategory]);

  const totalPages = Math.ceil(allFilteredProducts.length / ITEMS_PER_PAGE);
  const displayedProducts = allFilteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const loading = isLoading || searchLoading;

  const handleCategoryChange = (slug: string | null) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 px-4 sm:px-6">
      <div className="flex flex-col gap-6 mb-8">
        <h1 className="text-3xl font-medium text-center text-red-900 dark:text-red-500">
          Nuestros Productos
        </h1>

        <div className="relative max-w-2xl w-full mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 dark:text-red-500 text-red-900 transform -translate-y-1/2 h-5 w-5" />
            <Input
              placeholder="Buscar por nombre"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 text-base rounded-lg shadow-sm focus:border-red-900 dark:focus:border-red-500 border-muted-foreground/30"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(null)}
            className={cn(
              selectedCategory === null && "bg-red-900 hover:bg-red-800 text-white"
            )}
          >
            Todos
          </Button>
          {categories.map((cat: CategoryType) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.slug ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(cat.slug)}
              className={cn(
                selectedCategory === cat.slug && "bg-red-900 hover:bg-red-800 text-white"
              )}
            >
              {cat.categoryName}
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-muted-foreground/20" />

      {!loading && displayedProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="bg-muted/50 p-6 rounded-full mb-4">
            <PackageOpen className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-medium text-foreground mb-2">
            {debouncedSearch ? "No encontramos coincidencias" : "Catálogo vacío"}
          </h3>
          <p className="text-muted-foreground max-w-md">
            {debouncedSearch
              ? "Prueba con términos diferentes o más generales"
              : "Estamos trabajando para agregar nuevos productos pronto."}
          </p>
        </div>
      )}

      <div className="pt-8 grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <SkeletonSchema grid={1} variant="product" />
              </div>
            ))
          : displayedProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
