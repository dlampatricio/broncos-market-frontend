/* eslint-disable @next/next/no-img-element */
import IconButton from "@/components/icon-button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Expand, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  product: ProductType;
}

const ProductCard = (props: ProductCardProps) => {
  
  const { product } = props;
  const { addItem } = useCart()
  const router = useRouter();

  console.log(product)

  return ( 
    <Link href={`/product/${product.slug}`} 
    className="relative p-2 transition-all duration-100 rounded-lg hover:shadow-md">
      <Carousel
        opts={{
          align: "start"
        }}
        className="w-full max-w-sm">
        <CarouselContent>
          {product.images.map((image) => (
            <CarouselItem key={image.id} className="group">
              <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
              alt="Imagen"
              className="rounded-xl"
              />
              <div className="absolute w-full px-6 transition duration-200 opacity-0 group-hover:opacity-100 bottom-5">
                <div className="flex justify-center gap-x-6">
                  <IconButton onClick={() => router.push(`/product/${product.slug}`)} icon={<Expand size={20} className="text-gray-600" />} />
                  <IconButton onClick={() => addItem(product)} icon={<ShoppingCart size={20} className="text-gray-600" />} />
                </div>
              </div>
            </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <p className="text-2xl text-center">{product.productName}</p>
        <p className="font-bold text-center">{formatPrice(product.price)}</p>
    </Link>
   );
}
 
export default ProductCard;