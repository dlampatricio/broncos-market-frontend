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

  return (
    <div className="group relative overflow-hidden rounded-none sm:rounded-lg border border-border transition-all duration-300 hover:shadow-lg">
      <Carousel
        opts={{ align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id}>
              <div className="relative overflow-hidden cursor-pointer" onClick={() => {
                      router.push(`/product/${product.slug}`);
                    }}>
                <img 
                  src={image.formats.small.url}
                  alt={product.productName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay con botones centrados */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <IconButton 
                    onClick={() => {
                      router.push(`/product/${product.slug}`);
                    }}
                    icon={<Expand size={20} className="text-gray-800" />}
                    className="bg-white/90 hover:bg-white cursor-pointer"
                  />
                  <IconButton 
                    onClick={() => {
                      addItem(product);
                    }}
                    icon={<ShoppingCart size={20} className="text-gray-800" />}
                    className="bg-white/90 hover:bg-white cursor-pointer"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="p-4 flex justify-between items-center">
          <h3 className="text-lg font-medium text-foreground transition-colors duration-200 group-hover:text-primary line-clamp-1">
            {product.productName}
          </h3>
        <p className="text-lg font-bold text-primary ml-4">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;