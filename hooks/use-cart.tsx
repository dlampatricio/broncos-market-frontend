import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from 'sonner'

import { ProductType } from '@/types/product'

interface CartItem extends ProductType {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductType) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
}

export const useCart = create(persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: ProductType) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);

    if (existingItem) {
      set({
        items: currentItems.map((item) =>
          item.id === data.id
            ? { ...item, quantity: Math.max(item.quantity + 1, item.min) }
            : item
        ),
      });
      toast.success("Cantidad actualizada en el carrito.");
      return;
    }

    set({
      items: [...currentItems, { ...data, quantity: data.min || 1 }],
    });
    toast.success("Producto añadido al carrito.");
  },
  removeItem: (id: string) => {
    set({ items: get().items.filter((item) => item.id !== id) });
    toast.success("Producto eliminado del carrito.");
  },
  updateQuantity: (id: string, quantity: number) => {
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, item.min) } : item
      ),
    });
  },
  removeAll: () => set({ items: [] }),
}), {
  name: "cart-storage",
  storage: createJSONStorage(() => localStorage),
}))
