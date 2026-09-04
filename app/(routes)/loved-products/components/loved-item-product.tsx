"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";
import Link from "next/link";
import OptimizedImage from "@/components/optimized-image";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = ({ product }: LovedItemProductProps) => {
  const { removeLovedItem } = useLovedProducts();
  const { addItem } = useCart();

  return (
    <li className="flex p-4 bg-white rounded-lg shadow-sm dark:bg-card">
      <div className="relative flex-shrink-0 w-40 h-27 overflow-hidden rounded-md">
        <Link href={`/product/${product.slug}`}>
          <OptimizedImage
            src={product.images[0]?.formats?.medium?.url || product.images[0]?.url || ""}
            alt={product.productName}
            fill
            sizes="160px"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold line-clamp-1">{product.productName}</h2>
            <p className="font-bold text-primary">{formatPrice(product.price)}</p>
            <Button className="mt-3 rounded-full shadow-sm" onClick={() => addItem(product)}>
              Añadir al carrito
            </Button>
          </div>

          <div className="flex flex-col justify-between">
            <button
              onClick={() => removeLovedItem(product.id)}
              className={cn(
                "rounded-full flex items-center justify-center",
                "bg-white border shadow-sm p-1.5 hover:scale-110 transition",
                "dark:text-card-foreground dark:bg-neutral-800 cursor-pointer"
              )}
              aria-label="Eliminar de favoritos"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LovedItemProduct;
