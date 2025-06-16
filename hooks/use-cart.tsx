import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast} from 'sonner'

import { ProductType } from '@/types/product'

interface CartStore {
  items: ProductType[],
  addItem: (data: ProductType) => void,
  removeItem: (id: string) => void,
  removeAll: () => void,
}

export const useCart = create(persist<CartStore>( (set,get) => ({
  items: [],
  addItem: (data: ProductType) => {
    const currentItems = get().items
    const existingItem = currentItems.find((item) => item.id == data.id)

  if (existingItem){
    return toast.error("El Producto ya existe en el carrito.")
  }

  set({
    items: [ ... get().items, data]
  })
  toast.success("Producto añadido al carrito.")
  },
  removeItem: (id: string) => {
    set({ items: [ ... get().items.filter((item) => item.id !== id)]})
    toast.success("Producto eliminado del carrito.")
  },
  removeAll: () => set({ items: []})
}), {
  name: "cart-storage",
  storage: createJSONStorage(() => localStorage)
}))