import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { ProductType } from "@/types/product"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/format-price"
import ProductImageMiniature from "@/components/shared/product-image-miniature"
import { useEffect } from "react"

interface CartItemProps {
  product: ProductType & { min: number }
  quantity: number
  onQuantityChange: (quantity: number) => void
}

const CartItem = ({ product, quantity, onQuantityChange }: CartItemProps) => {
  const { removeItem } = useCart()

  // Asegurar que la cantidad nunca sea menor que el mínimo del producto
  useEffect(() => {
    if (quantity < product.min) {
      onQuantityChange(product.min)
    }
  }, [product.min, quantity, onQuantityChange])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || product.min
    onQuantityChange(Math.max(product.min, value))
  }

  const incrementQuantity = () => {
    onQuantityChange(quantity + 1)
  }

  const decrementQuantity = () => {
    onQuantityChange(Math.max(product.min, quantity - 1))
  }

  return (
    <li className="flex p-4 bg-white rounded-lg shadow-sm dark:bg-card">
      <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-md">
        <ProductImageMiniature 
          slug={product.slug} 
          url={product.images[0]?.formats?.medium?.url || ''} 
          className="object-cover object-center w-full h-full"
        />
      </div>
      
      <div className="flex flex-col flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold line-clamp-1">{product.productName}</h2>
            <div className="flex items-baseline gap-2">
              <p className="font-bold text-primary">
                {formatPrice(product.price * quantity)}
              </p>
              {quantity > product.min && (
                <span className="text-sm text-muted-foreground">
                  ({formatPrice(product.price)} c/u)
                </span>
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
                onClick={decrementQuantity}
                disabled={quantity <= product.min}
                className={`w-7 h-7 flex items-center justify-center rounded-md border shadow-sm hover:bg-gray-50 transition-colors ${
                  quantity <= product.min ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                aria-label="Reducir cantidad"
              >
                -
              </button>
              <Input
                type="number"
                min={product.min}
                value={quantity}
                onChange={handleInputChange}
                className="w-16 h-7 text-center shadow-sm [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Cantidad"
              />
              <button 
                onClick={incrementQuantity}
                className="w-7 h-7 flex items-center justify-center rounded-md border shadow-sm hover:bg-gray-50 transition-colors"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem