import ProductImageMiniature from "@/components/shared/product-image-miniature";
import ProductWeightSize from "@/components/shared/product-weight-size";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import { ProductQuantity } from "./product-quantity";

interface CartItemProps {
  product: ProductType;
}

const CartItem = (props: CartItemProps) => {

  const { product } = props;
  const { removeItem } = useCart();

  console.log(product)

  return ( 
    <li className="flex py-6 border-b">
      <ProductImageMiniature slug={product.slug} url={product.images[0].formats.small.url} />
      <div className="flex justify-between flex-1 px-6">
        <div>
          <h2 className="text-lg font-bold">{product.productName}</h2>
          <p className="font-bold">{formatPrice(product.price)}</p>
          <ProductWeightSize weight={product.weight} size={product.familySize}/>
        </div>
        <div>
            <button className={cn("rounded-full flex items-center ml-9 justify-center bg-white border shadow-md p-1 hover:scale-110 transition dark:text-black cursor-pointer")}>
              <X size={20} onClick={() => removeItem(product.id)} /> 
            </button>
            <ProductQuantity product={product} />
          </div>
      </div>
    </li>
   );
}
 
export default CartItem;