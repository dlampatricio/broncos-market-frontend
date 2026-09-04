"use client";

import { useMemo, useState, useCallback } from "react";
import { useFeaturedProducts } from "@/lib/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "./ui/carousel";
import SkeletonSchema from "./skeleton-schema";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart, PackageOpen, Pause, Play } from "lucide-react";
import IconButton from "./icon-button";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/hooks/use-cart";
import OptimizedImage from "./optimized-image";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const FeaturedProducts = () => {
  const { data, isLoading, isError } = useFeaturedProducts();
  const router = useRouter();
  const { addItem } = useCart();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const [autoplay] = useState(() =>
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  const sortedProducts = useMemo(() => {
    if (!data?.data) return [];
    return [...data.data].sort((a, b) => a.price - b.price);
  }, [data]);

  const onSetApi = useCallback((carouselApi: CarouselApi) => {
    if (!carouselApi) return;
    setApi(carouselApi);
    setCurrent(carouselApi.selectedScrollSnap());
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, []);

  const toggleAutoplay = useCallback(() => {
    if (isPlaying) {
      autoplay.stop();
    } else {
      autoplay.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, autoplay]);

  return (
    <div className="max-w-6xl py-4 mx-auto sm:py-16 px-4 sm:px-24">
      <div className="flex items-center justify-center gap-3 mb-8">
        <h3 className="text-red-900 dark:text-red-500 text-3xl font-bold text-center">
          Productos Destacados
        </h3>
        {!isLoading && sortedProducts.length > 1 && (
          <button
            onClick={toggleAutoplay}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border transition-colors",
              "border-red-900/30 dark:border-red-500/30",
              isPlaying
                ? "text-red-900 dark:text-red-500 hover:bg-red-900/10 dark:hover:bg-red-500/10"
                : "text-muted-foreground hover:bg-muted"
            )}
            aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>

      <Carousel
        opts={{ align: "center", loop: true }}
        setApi={onSetApi}
        plugins={[autoplay]}
      >
        <CarouselContent className="-ml-2">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <CarouselItem key={index} className="pl-2 basis-[80%] sm:basis-1/2 lg:basis-1/3">
                  <SkeletonSchema grid={1} variant="product" />
                </CarouselItem>
              ))
            : isError || sortedProducts.length === 0
            ? (
              <CarouselItem className="pl-2 basis-full">
                <div className="flex flex-col items-center justify-center w-full py-12 text-center">
                  <PackageOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground">No hay productos destacados</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Disponibles pronto.</p>
                </div>
              </CarouselItem>
            )
            : sortedProducts.map((product: ProductType) => (
                <CarouselItem key={product.id} className="pl-2 basis-[80%] sm:basis-1/2 lg:basis-1/3">
                  <div className="group relative block overflow-hidden rounded-lg border border-border">
                    <div
                      className="relative overflow-hidden bg-muted transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-md cursor-pointer aspect-square"
                      onClick={() => router.push(`product/${product.slug}`)}
                    >
                      <OptimizedImage
                        src={product.images[0]?.formats?.medium?.url || product.images[0]?.url || ""}
                        alt={product.productName}
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                        priority={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <IconButton
                          onClick={() => router.push(`product/${product.slug}`)}
                          icon={<Expand size={20} />}
                          className="text-gray-600 cursor-pointer"
                        />
                        <IconButton
                          onClick={() => addItem(product)}
                          icon={<ShoppingCart size={20} />}
                          className="text-gray-600 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-lg font-bold hover:text-primary transition-colors duration-200">
                          &quot;{product.productName}&quot;
                        </p>
                        <p className="px-3 py-1 text-sm font-medium text-white bg-red-900 dark:bg-red-800 rounded-full whitespace-nowrap">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      {!isLoading && sortedProducts.length > 1 && (
        <div className="flex justify-center gap-2 mt-4 sm:hidden">
          {sortedProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                current === i
                  ? "bg-red-900 dark:bg-red-500"
                  : "bg-red-900/20 dark:bg-red-500/20"
              )}
              aria-label={`Ir al producto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;
