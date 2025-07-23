/* eslint-disable @next/next/no-img-element */
import IconButton from "@/components/icon-button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    if (product.active) {
      addItem(product);
    }
  };

  const handleViewProduct = () => {
    if (product.active) {
      router.push(`/product/${product.slug}`);
    }
  };

  return (
    <div className={`group relative overflow-hidden rounded-none sm:rounded-lg border border-border transition-all duration-300 hover:shadow-lg ${
      !product.active ? '' : ''
    }`}>
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
      
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id}>
              <div 
                className="relative overflow-hidden cursor-pointer" 
                onClick={handleViewProduct}
              >
                <img 
                  src={image.formats.medium.url}
                  alt={product.productName}
                  className={`h-full w-full object-cover transition-transform duration-500 ${
                    product.active ? 'group-hover:scale-105' : ''
                  }`}
                  loading="lazy"
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

      <div className="p-4 flex justify-between items-center">
        <h3 className={`text-lg font-medium transition-colors duration-200 ${
          product.active 
            ? 'text-foreground group-hover:text-primary' 
            : 'text-foreground dark:text-foreground'
        } line-clamp-1`}>
          {product.productName}
        </h3>
        <p className={`text-lg font-bold ${
          product.active ? 'text-primary' : 'text-foreground dark:text-foreground'
        } ml-4`}>
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;