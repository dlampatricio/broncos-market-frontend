"use client"
import { useLovedProducts } from "@/hooks/use-loved-products"
import LovedItemProduct from "./components/loved-item-product"

export default function Page() {
  const { lovedItems } = useLovedProducts()

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold dark:text-red-500 text-red-900">
        Productos que te gustan
      </h1>
      
      <div className="space-y-4">
        {lovedItems.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-lg shadow-sm dark:bg-card">
            <p className="text-gray-600 dark:text-gray-300">
              No hay productos en tu lista de favoritos
            </p>
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
  )
}