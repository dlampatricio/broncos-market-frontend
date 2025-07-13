'use client'

import { useState, useEffect } from 'react';
import useGetProductByName from "@/api/useGetProductByName";
import { Separator } from "@/components/ui/separator";
import SkeletonSchema from "@/components/skeleton-schema";
import { ProductType } from "@/types/product";
import { ResponseType } from "@/types/response";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import useGetAllProducts from '@/api/useGetAllProducts';
import ProductCard from '../category/[categorySlug]/components/product-card';
import  useDebounce  from '@/hooks/use-debounce';
import { Button } from '@/components/ui/button';

export default function Page() {
  const { result, loading }: ResponseType = useGetAllProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { result: searchResults, loading: searchLoading } = useGetProductByName(debouncedSearchQuery);
  
  const [displayedProducts, setDisplayedProducts] = useState<ProductType[]>([]);

  // Filtrar productos que tienen imágenes
  useEffect(() => {
    const productsToFilter = debouncedSearchQuery ? searchResults : result;
    const filteredProducts = productsToFilter?.filter((product: ProductType) => 
      product.images && product.images.length > 0 && 
      product.images.some(img => 
        img.formats?.medium?.url || 
        img.formats?.small?.url
      )
    ) || [];
    
    setDisplayedProducts(filteredProducts);
  }, [result, searchResults, debouncedSearchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 px-4 sm:px-6">
      {/* Header con buscador */}
      <div className="flex flex-col gap-6 mb-8">
        <h1 className="text-3xl font-medium text-center text-red-900 dark:text-red-500">Nuestros Productos</h1>
        
        {/* Buscador mejorado */}
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
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full hover:bg-muted/50"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <Separator className="bg-muted-foreground/20" />

      {/* Grid de productos */}
      <div className="pt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {loading || searchLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <SkeletonSchema grid={1} variant="product" />
            </div>
          ))
        ) : !displayedProducts || displayedProducts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-muted/50 p-6 rounded-full mb-4">
              <Search className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">
              {debouncedSearchQuery ? "No encontramos coincidencias" : "Catálogo vacío"}
            </h3>
            <p className="text-muted-foreground max-w-md">
              {debouncedSearchQuery 
                ? "Prueba con términos diferentes o más generales" 
                : "Estamos trabajando para agregar nuevos productos pronto."}
            </p>
          </div>
        ) : (
          displayedProducts.map((product: ProductType) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}