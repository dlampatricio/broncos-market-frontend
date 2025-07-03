import ProductImageMiniature from "@/components/shared/product-image-miniature";
import ProductWeightSize from "@/components/shared/product-weight-size";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = (props: LovedItemProductProps) => {
  const { product } = props;
  const { removeLovedItem } = useLovedProducts();
  const { addItem } = useCart();

  return ( 
    <li className="flex p-4 bg-white rounded-lg shadow-sm dark:bg-card">
      {/* Contenedor de imagen */}
      <div className="relative pt-3 flex-shrink-0 w-40 h-27 overflow-hidden rounded-md">
        <ProductImageMiniature 
          slug={product.slug} 
          url={product.images[0].formats.medium.url}
          className="w-full h-full"
        />
      </div>
      
      <div className="flex flex-col flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold line-clamp-1">{product.productName}</h2>
            <p className="font-bold text-primary">{formatPrice(product.price)}</p>
            <ProductWeightSize 
              weight={product.weight} 
              size={product.familySize}
            />
            <Button 
              className="mt-3 rounded-full shadow-sm"
              onClick={() => addItem(product)}
            >
              Añadir al carrito
            </Button>
          </div>
          
          <div className="flex flex-col justify-between">
            <button 
              onClick={() => removeLovedItem(product.id)}
              className={cn(
                "rounded-full flex items-center justify-center",
                "bg-white border shadow-sm p-1 hover:scale-110 transition",
                "dark:text-card-foreground dark:bg-neutral-800 cursor-pointer"
              )}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
 
export default LovedItemProduct;