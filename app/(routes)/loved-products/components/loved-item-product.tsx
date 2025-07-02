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
    <li className="flex py-6 border-b">
      <ProductImageMiniature slug={product.slug} url={product.images[0].formats.medium.url} />
      <div className="flex justify-between flex-1 px-6">
        <div>
            <h2 className="text-lg font-bold">{product.productName}</h2>
            <p className="font-bold">{formatPrice(product.price)}</p>
            <ProductWeightSize weight={product.weight} size={product.familySize}/>
            <Button className="mt-5 rounded-full cursor-pointer" onClick={() => addItem(product)}>
              Añadir al carrito
            </Button>
          </div>
          <div>
            <button className={cn("rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition cursor-pointer dark:text-black")}>
              <X size={20} onClick={() => removeLovedItem(product.id)} />
            </button>
          </div>
      </div>
    </li>
   );
}
 
export default LovedItemProduct;