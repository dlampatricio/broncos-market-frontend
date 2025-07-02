"use client"

import { BaggageClaim, Heart, ShoppingCart, User } from "lucide-react";
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
    <div className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
      {/* Logo */}
      <h1 className="text-3xl cursor-pointer" onClick={() => router.push("/")}>
        <span className="font-bold">Bronco&apos;s </span>
        Market
      </h1>

      {/* Menú para desktop (oculto en mobile) */}
      <div className="items-center justify-between hidden sm:flex">
        <MenuList/>
      </div>

      {/* Contenido para mobile */}
      <div className="flex items-center sm:hidden gap-4">
        {/* Solo mostrar carrito en mobile */}
        {cart.items.length === 0 ? (
          <ShoppingCart 
            strokeWidth="1" 
            className="w-6 h-6" 
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div 
            className="flex items-center gap-1" 
            onClick={() => router.push("/cart")}
          >
            <BaggageClaim strokeWidth={1} className="w-6 h-6" />
            <span className="text-sm">{cart.items.length}</span>
          </div>
        )}
        
        {/* Menú mobile */}
        <ItemsMenuMobile />
      </div>

      {/* Contenido para desktop (oculto en mobile) */}
      <div className="items-center justify-between hidden sm:flex gap-7 pl-2">
        {cart.items.length === 0 ? (
          <ShoppingCart 
            strokeWidth="1" 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => router.push("/cart")}
          />
        ) : (
          <div 
            className="flex items-center gap-1 cursor-pointer" 
            onClick={() => router.push("/cart")}
          >
            <BaggageClaim strokeWidth={1} className="w-6 h-6" />
            <span>{cart.items.length}</span>
          </div>
        )}
        <Heart 
          strokeWidth="1" 
          className={`w-6 h-6 cursor-pointer ${lovedItems.length > 0 && 'fill-black dark:fill-white'}`} 
          onClick={() => router.push("/loved-products")}
        />
        <User 
          strokeWidth="1" 
          className="w-6 h-6 cursor-pointer" 
          onClick={() => router.push("/user")}
        />
        <ToggleTheme />
      </div>
    </div>
  )
}

export default NavBar;