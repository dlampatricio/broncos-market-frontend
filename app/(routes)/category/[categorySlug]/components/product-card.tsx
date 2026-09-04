"use client";

import IconButton from "@/components/icon-button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import OptimizedImage from "@/components/optimized-image";

type ProductCardProps = {
  product: ProductType;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (product.active) addItem(product);
  };

  const handleViewProduct = () => {
    if (product.active) router.push(`/product/${product.slug}`);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-none sm:rounded-lg border border-border transition-all duration-300 hover:shadow-lg`}
    >
      {!product.active && (
        <>
          <div className="absolute inset-0 z-10 bg-white/40 dark:bg-black/40" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <span className="bg-foreground text-background dark:bg-background dark:text-foreground px-4 py-2 text-sm font-medium rounded-md border border-border shadow-lg">
              Agotado
            </span>
          </div>
        </>
      )}

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id}>
              <div
                className="relative overflow-hidden cursor-pointer aspect-square"
                onClick={handleViewProduct}
              >
                <OptimizedImage
                  src={image.formats?.medium?.url || image.url}
                  alt={product.productName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {product.active && (
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <IconButton
                      onClick={handleViewProduct}
                      icon={<Expand size={20} className="text-gray-800" />}
                      className="bg-white/90 hover:bg-white cursor-pointer"
                    />
                    <IconButton
                      onClick={handleAddToCart}
                      icon={<ShoppingCart size={20} className="text-gray-800" />}
                      className="bg-white/90 hover:bg-white cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="p-4 flex flex-col gap-1">
        <h3
          className={`text-sm sm:text-lg font-medium transition-colors duration-200 ${
            product.active ? "text-foreground group-hover:text-primary" : "text-foreground"
          }`}
        >
          {product.productName}
        </h3>
        <p
          className={`text-sm sm:text-lg font-bold ${
            product.active ? "text-primary" : "text-foreground"
          }`}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
