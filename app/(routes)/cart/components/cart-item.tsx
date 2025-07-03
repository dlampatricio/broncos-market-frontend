import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { ProductType } from "@/types/product"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/format-price"
import ProductImageMiniature from "@/components/shared/product-image-miniature"
// import ProductWeightSize from "@/components/shared/product-weight-size"

interface CartItemProps {
  product: ProductType
  quantity: number
  onQuantityChange: (quantity: number) => void
}

const CartItem = ({ product, quantity, onQuantityChange }: CartItemProps) => {
  const { removeItem } = useCart()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    onQuantityChange(Math.max(1, value))
  }

  return (
    <li className="flex p-4 bg-white rounded-lg shadow-sm dark:bg-card">
      <div className="relative flex-shrink-0 w-40 h-24 overflow-hidden rounded-md">
        <ProductImageMiniature 
          slug={product.slug} 
          url={product.images[0].formats.medium.url} 
          className="object-cover object-center w-full h-full"
        />
      </div>
      
      <div className="flex flex-col flex-1 ml-4">
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold line-clamp-1">{product.productName}</h2>
            <p className="font-bold text-primary">
              {formatPrice(product.price * quantity)}
            </p>
            {/* <ProductWeightSize 
              weight={product.weight} 
              size={product.familySize}
            /> */}
          </div>
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end">
              <button 
                onClick={() => removeItem(product.id)}
                className="rounded-full flex items-center justify-center bg-white border shadow-md p-1 hover:scale-110 transition dark:text-card-foreground dark:bg-neutral-800 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex">
              <div className="items-center gap-2 mt-5">
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-18 h-7 text-center hover:scale-110 transition shadow-md cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem