import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import OptimizedImage from "@/components/optimized-image";
import type { ProductImage } from "@/types/product";

interface CarouselProductProps {
  images: ProductImage[];
  productName: string;
}

const CarouselProduct = ({ images, productName }: CarouselProductProps) => {
  return (
    <div className="px-4 sm:px-16">
      <Carousel>
        <CarouselContent className="-ml-2">
          {images.map((image, index) => (
            <CarouselItem key={image.id} className="pl-2">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <OptimizedImage
                  src={image.formats?.medium?.url || image.url}
                  alt={`${productName} - imagen ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="rounded-lg"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
