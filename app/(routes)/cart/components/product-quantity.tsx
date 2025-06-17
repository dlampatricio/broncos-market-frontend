"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types/product";

interface ProductQuantityProps {
  product: ProductType;
}

export function ProductQuantity({ product }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState<number>(product.min || 1);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setQuantity(Math.max(value, product.min || 1));
    }
  };

  return (
    <div className="items-center gap-2">
      <Input
        type="number"
        className="w-20 text-center"
        min={product.min || 1}
        value={quantity}
        onChange={handleInputChange}
      />
    </div>
  );
}