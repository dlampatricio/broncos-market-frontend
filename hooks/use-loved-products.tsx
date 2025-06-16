import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast} from 'sonner'

import { ProductType } from '@/types/product'

interface UseLovedProductType {
  lovedItems: ProductType[],
  addLovedItem: (data: ProductType) => void,
  removeLovedItem: (id: string) => void,
}

export const useLovedProducts = create(persist<UseLovedProductType>( (set,get) => ({
  lovedItems: [],
  addLovedItem: (data: ProductType) => {
    const currentLovedItems = get().lovedItems
    const existingItem = currentLovedItems.find((item) => item.id == data.id)

  if (existingItem){
    return toast.error("El Producto ya existe en la lista.")
  }

  set({
    lovedItems: [ ... get().lovedItems, data]
  })
  toast.success("Producto añadido a la lista.")
  },
  removeLovedItem: (id: string) => {
    set({ lovedItems: [ ... get().lovedItems.filter((item) => item.id !== id)]})
    toast.success("Producto eliminado de la lista.")
  },
}), {
  name: "loved-products-storage",
  storage: createJSONStorage(() => localStorage)
}))