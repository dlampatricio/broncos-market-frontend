"use client"

import { BaggageClaim, Heart, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const NavBar = () => {
  const router = useRouter();
  const cart = useCart()
  const { lovedItems } = useLovedProducts()

  return (
    <div className="flex items-center justify-between p-4 mx-auto max-w-screen-xl border-b">
      {/* Logo */}
      <h1 
        className="text-2xl cursor-pointer text-red-900 dark:text-red-500"
        onClick={() => router.push("/")}
      >
        <span className="font-bold">Bronco&apos;s</span>
        <span className="ml-2">Market</span>
      </h1>

      {/* Menú para desktop (oculto en mobile) */}
      <div className="items-center justify-between hidden sm:flex">
        <MenuList/>
      </div>

      {/* Iconos de navegación */}
      <div className="flex items-center gap-4">
        {/* Contenido para desktop (oculto en mobile) */}
        <div className="items-center hidden sm:flex gap-5">
          <Search 
            strokeWidth="1.5" 
            className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors" 
            onClick={() => router.push("/all-products")}
          />
          {cart.items.length === 0 ? (
            <ShoppingCart 
              strokeWidth="1.5" 
              className="w-5 h-5 cursor-pointer text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors" 
              onClick={() => router.push("/cart")}
            />
          ) : (
            <div 
              className="flex items-center gap-1 cursor-pointer" 
              onClick={() => router.push("/cart")}
            >
              <BaggageClaim 
                strokeWidth="1.5" 
                className="w-5 h-5 text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors" 
              />
              <span className="text-sm text-red-900 dark:text-red-500">{cart.items.length}</span>
            </div>
          )}
          <Heart 
            strokeWidth="1.5" 
            className={`w-5 h-5 cursor-pointer text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 transition-colors ${lovedItems.length > 0 && 'fill-current'}`} 
            onClick={() => router.push("/loved-products")}
          />
          <ToggleTheme />
        </div>

        {/* Contenido para mobile */}
        <div className="flex items-center sm:hidden gap-4">
          <Search 
            strokeWidth="1.5" 
            className="w-5 h-5 cursor-pointer text-red-900 dark:text-red-500" 
            onClick={() => router.push("/all-products")}
          />
          {cart.items.length === 0 ? (
            <ShoppingCart 
              strokeWidth="1.5" 
              className="w-5 h-5 text-red-900 dark:text-red-500" 
              onClick={() => router.push("/cart")}
            />
          ) : (
            <div 
              className="flex items-center gap-1" 
              onClick={() => router.push("/cart")}
            >
              <BaggageClaim strokeWidth={1.5} className="w-5 h-5 text-red-900 dark:text-red-500" />
              <span className="text-sm text-red-900 dark:text-red-500">{cart.items.length}</span>
            </div>
          )}
          <ItemsMenuMobile />
        </div>
      </div>
    </div>
  )
}

export default NavBar;