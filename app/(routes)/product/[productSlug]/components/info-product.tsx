import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
  product: ProductType;
}

const InfoProduct = (props: InfoProductProps) => {
  
  const { product } = props; 

  return ( 
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">&quot;{product.productName}&quot;</h1>
        <div className="flex items-center justify-between gap-3">
          <p className="px-2 py-1 text-xs text-white bg-black rounded-full dark:bg-white dark:text-black w-fit">
            {product.weight}
          </p>
          <p className="px-2 py-1 text-xs text-white bg-red-900 rounded-full w-fit">
            {product.familySize}
          </p>
        </div>
      </div>
      <Separator className="my-4"/>
      <p>{product.description}</p>
      <Separator className="my-4"/>
      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
      <div className="flex items-center gap-5">
        <Button className="flex-grow" onClick={() => console.log("Comprar")}>Comprar</Button>
        <Heart width={30} strokeWidth={1} className="flex-shrink-0 transition duration-300 cursor-pointer hover:fill-black" onClick={() => console.log("Add To Loved Products")}/>
      </div>
    </div>
   );
}
 
export default InfoProduct;