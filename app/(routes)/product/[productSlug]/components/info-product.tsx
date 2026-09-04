"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/format-price";
import { ProductType } from "@/types/product";
import { Heart } from "lucide-react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = ({ product }: InfoProductProps) => {
  const { addItem } = useCart();
  const { lovedItems, addLovedItem, removeLovedItem } = useLovedProducts();
  const isLoved = lovedItems.some((item) => item.id === product.id);

  const handleLoveClick = () => {
    if (isLoved) {
      removeLovedItem(product.id);
    } else {
      addLovedItem(product);
    }
  };

  return (
    <div className="px-6">
      <div className="justify-between mb-3 sm:flex">
        <h1 className="text-2xl">&quot;{product.productName}&quot;</h1>
      </div>
      <Separator className="my-4" />
      <p>{product.description}</p>
      <Separator className="my-4" />
      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>
      <div className="flex items-center gap-5">
        <Button className="flex-grow" onClick={() => addItem(product)}>
          Añadir al carrito
        </Button>
        <button
          onClick={handleLoveClick}
          className="flex-shrink-0 p-2.5 rounded-md hover:bg-red-50 dark:hover:bg-card/50 transition-colors"
          aria-label={isLoved ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
          <Heart
            width={30}
            strokeWidth={1}
            className={`transition duration-300 text-red-900 dark:text-red-500 ${
              isLoved
                ? "fill-red-900 dark:fill-red-500"
                : "hover:fill-red-900 dark:hover:fill-red-500"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default InfoProduct;
