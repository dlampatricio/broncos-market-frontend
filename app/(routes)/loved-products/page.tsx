"use client";

import { useLovedProducts } from "@/hooks/use-loved-products";
import LovedItemProduct from "./components/loved-item-product";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LovedProductsPage() {
  const { lovedItems } = useLovedProducts();

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold dark:text-red-500 text-red-900">
        Productos que te gustan
      </h1>

      <div className="space-y-4">
        {lovedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-medium mb-2">No hay productos favoritos</h3>
            <p className="text-muted-foreground mb-6">
              Explora nuestros productos y guarda los que más te gusten.
            </p>
            <Link href="/all-products">
              <Button>Explorar productos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lovedItems.map((item) => (
              <LovedItemProduct key={item.id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
