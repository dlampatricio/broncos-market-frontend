'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/format-price"
import CartItem from "./components/cart-item"
import { TownsCombobox } from "@/app/(routes)/cart/components/towns-combobox"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const { items, removeAll } = useCart()
  const prices = items.map((product => product.price))
  const totalPrice = prices.reduce((total,price) => total + price, 0) 
  const router = useRouter()
  
  const [selectedTown, setSelectedTown] = useState<string>("")
  
  const deliveryPrices: Record<string, number> = {
    "cienfuegos": 0,
    "palmira": 10,
    "rodas": 30,
    "abreus": 20,
    "aguada-de-pasajeros": 30,
    "cruces": 50,
    "lajas": 40,
    "cumanayagua": 50
  }
  
  const delivery = selectedTown ? deliveryPrices[selectedTown] || 0 : 0;

  const handleBuyClick = () => {
    const productsList = items.map(item => `- ${item.productName} (${formatPrice(item.price)})`).join('%0A');
    const message = `¡Hola! Quiero hacer un pedido:%0A%0A*Productos:*%0A${productsList}%0A%0A*Municipio de entrega:* ${selectedTown}%0A*Total productos:* ${formatPrice(totalPrice)}%0A*Envío:* ${formatPrice(delivery)}%0A*Total a pagar:* ${formatPrice(totalPrice + delivery)}`;
    
    window.open(`https://wa.me/5353811810?text=${message}`, '_blank');
    router.push('/success')
    removeAll();
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Carrito de Compra</h1>
      
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Lista de productos */}
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="p-6 text-center bg-white rounded-lg shadow-sm dark:bg-card">
              <p className="text-gray-600 dark:text-gray-300">No hay productos en el carrito</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} product={item} />
              ))}
            </ul>
          )}
        </div>
        
        {/* Resumen de compra */}
        <div>
          <div className="p-6 space-y-6 bg-white rounded-lg shadow-sm dark:bg-card">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Resumen del pedido</h2>
            <Separator className="bg-gray-200 dark:bg-gray-700" />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Subtotal ({items.length} {items.length === 1 ? 'artículo' : 'artículos'})
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Envío</span>
                <span className={`font-medium ${selectedTown ? 'text-gray-900 dark:text-white' : 'text-orange-500'}`}>
                  {selectedTown ? formatPrice(delivery) : "Seleccione municipio"}
                </span>
              </div>
              
              <Separator className="bg-gray-200 dark:bg-gray-700" />
              
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {selectedTown ? formatPrice(totalPrice + delivery) : "---"}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Municipio de entrega
              </label>
              <TownsCombobox 
                selectedTown={selectedTown}
                onTownSelect={setSelectedTown}
              />
            </div>

            <Button 
              className="w-full py-6 text-base font-medium shadow-md"
              onClick={handleBuyClick}
              disabled={items.length === 0 || !selectedTown}
            >
              Finalizar compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}