'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/format-price"
import CartItem from "./components/cart-item"
import { TownsCombobox } from "@/app/(routes)/cart/components/towns-combobox"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function Page() {
  const { items, removeAll } = useCart()
  const [selectedTown, setSelectedTown] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const router = useRouter()
  
  const [quantities, setQuantities] = useState<Record<string, number>>(
    items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {}
  ))

  const totalPrice = items.reduce((total, product) => {
    return total + (product.price * (quantities[product.id] || 1))
  }, 0) 
  
  const deliveryPrices: Record<string, number> = {
    "cienfuegos": 0,
    "palmira": 5,
    "rodas": 10,
    "abreus": 10,
    "aguada-de-pasajeros": 18,
    "cruces": 10,
    "lajas": 14,
    "cumanayagua": 10
  }
  
  const delivery = selectedTown ? deliveryPrices[selectedTown] || 0 : 0;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantities(prev => ({
        ...prev,
        [productId]: newQuantity
      }))
    }
  }

  const handleBuyClick = () => {
    const productsList = items.map(item => {
      const quantity = quantities[item.id] || 1
      return `- ${item.productName} (${formatPrice(item.price)} x ${quantity} = ${formatPrice(item.price * quantity)})`
    }).join('%0A')
    
    const message = `¡Hola! Quiero hacer un pedido:%0A%0A*Productos:*%0A${productsList}%0A%0A*Municipio de entrega:* ${selectedTown}%0A*Dirección:* ${address}%0A*Total productos:* ${formatPrice(totalPrice)}%0A*Envío:* ${formatPrice(delivery)}%0A*Total a pagar:* ${formatPrice(totalPrice + delivery)}`
    
    window.open(`https://wa.me/5358527122?text=${message}`, '_blank')
    router.push('/success')
    removeAll()
  }

  const totalItems = Object.values(quantities).reduce((total, qty) => total + qty, 0)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-red-900 dark:text-red-500 mb-6">
          Carrito de Compra
        </h1>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Lista de productos */}
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="p-6 text-center bg-gray-100 rounded-lg border border-red-100 dark:bg-card">
              <p className="text-gray-600 dark:text-gray-300">No hay productos en el carrito</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem 
                  key={item.id} 
                  product={item}
                  quantity={quantities[item.id] || 1}
                  onQuantityChange={(qty) => handleQuantityChange(item.id, qty)}
                />
              ))}
            </ul>
          )}
        </div>
        
        {/* Resumen de compra */}
        <div>
          <div className="p-6 space-y-6 bg-gray-100 rounded-lg border dark:bg-card">
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-500 text-center">Resumen del pedido</h2>
            <Separator className="bg-red-900 dark:bg-red-500" />
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">
                  Subtotal ({totalItems} {totalItems === 1 ? 'artículo' : 'artículos'})
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
              
              <Separator className="bg-red-900 dark:bg-red-500" />
              
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

            <div className="space-y-3 pt-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Dirección exacta
              </label>
              <Input
                placeholder="Calle, número, entre calles..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border-gray-300 focus:border-red-900 dark:focus:border-red-500"
              />
            </div>

            <Button 
              className="w-full py-6 text-base font-medium bg-red-900 hover:bg-red-800 text-white shadow-md transition"
              onClick={handleBuyClick}
              disabled={items.length === 0 || !selectedTown || !address}
            >
              Finalizar compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}