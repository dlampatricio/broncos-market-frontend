import ProductWeightSize from "@/components/shared/product-weight-size";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
  product: ProductType;
}

const InfoProduct = (props: InfoProductProps) => {
  
  const { product } = props; 
  const { addItem } = useCart()
  const { addLovedItem } = useLovedProducts()

  return ( 
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">&quot;{product.productName}&quot;</h1>
        <ProductWeightSize weight={product.weight} size={product.familySize}/>
      </div>
      <Separator className="my-4"/>
      <p>{product.description}</p>
      <Separator className="my-4"/>
      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
      <div className="flex items-center gap-5">
        <Button className="flex-grow" onClick={() => addItem(product)}>Comprar</Button>
        <Heart width={30} strokeWidth={1} className="flex-shrink-0 transition duration-300 cursor-pointer hover:fill-black" onClick={() => addLovedItem(product)}/>
      </div>
    </div>
   );
}
 
export default InfoProduct;