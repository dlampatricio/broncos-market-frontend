import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import ProductImageMiniature from "@/components/shared/product-image-miniature";
import { ProductImage } from "@/types/product";

interface CartItemProps {
  product: { id: string; productName: string; price: number; min: number; slug: string; images: ProductImage[]; quantity: number };
  onQuantityChange: (quantity: number) => void;
}

const CartItem = ({ product, onQuantityChange }: CartItemProps) => {
  const { removeItem } = useCart();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || product.min;
    onQuantityChange(Math.max(product.min, value));
  };

  return (
    <li className="flex p-4 bg-white rounded-lg shadow-sm dark:bg-card">
      <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-md">
        <ProductImageMiniature
          slug={product.slug}
          url={product.images[0]?.formats?.medium?.url || product.images[0]?.url || ""}
          className="w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold line-clamp-1">{product.productName}</h2>
            <div className="flex flex-col">
              <p className="font-bold text-primary">{formatPrice(product.price * product.quantity)}</p>
              {product.quantity > product.min && (
                <span className="text-sm text-muted-foreground">{formatPrice(product.price)} c/u</span>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end">
              <button
                onClick={() => removeItem(product.id)}
                className="rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition dark:text-card-foreground dark:bg-neutral-800 cursor-pointer"
                aria-label="Eliminar producto"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => onQuantityChange(Math.max(product.min, product.quantity - 1))}
                disabled={product.quantity <= product.min}
                className={`w-9 h-9 flex items-center justify-center rounded-md border shadow-sm hover:bg-muted transition-colors ${
                  product.quantity <= product.min ? "opacity-50 cursor-not-allowed" : ""
                }`}
                aria-label="Reducir cantidad"
              >
                -
              </button>
              <Input
                type="number"
                min={product.min}
                value={product.quantity}
                onChange={handleInputChange}
                className="w-16 h-9 text-center shadow-sm [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Cantidad"
              />
              <button
                onClick={() => onQuantityChange(product.quantity + 1)}
                className="w-9 h-9 flex items-center justify-center rounded-md border shadow-sm hover:bg-muted transition-colors"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
