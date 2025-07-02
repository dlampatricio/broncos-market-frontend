/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface CarouselProductProps {
  images: {
    id: number;
    formats: {
      medium: {
        url: string;
      }
    }
  }[];
}

const CarouselProduct = (props: CarouselProductProps) => {
  
  const { images } = props;
  
  return ( 
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <img src={`${image.formats.medium.url}`} alt="Imagen del Producto" className="rounded-lg" />
            </CarouselItem> 
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
   );
}
 
export default CarouselProduct;