import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { ProductType } from '@/types/product'

interface CartStore {
  items: ProductType[],
  addItem: (data: ProductType) => void,
  removeItem: (id: string) => void,
  removeAll: () => void,
}

export const useCart = () => {
  
}