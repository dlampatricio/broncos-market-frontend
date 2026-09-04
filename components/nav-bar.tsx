"use client";

import { BaggageClaim, Heart, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import MenuList from "./menu-list";
import ItemsMenuMobile from "./items-menu-mobile";
import ToggleTheme from "./toggle-theme";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const NavBar = () => {
  const router = useRouter();
  const cart = useCart();
  const { lovedItems } = useLovedProducts();

  const cartCount = cart.items.length;

  return (
    <div className="flex items-center justify-between p-4 mx-auto max-w-7xl">
      {/* Logo */}
      <span
        className="text-2xl cursor-pointer text-red-900 dark:text-red-500"
        onClick={() => router.push("/")}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && router.push("/")}
        aria-label="Bronco's Market - Ir al inicio"
      >
        <span className="font-bold">Bronco&apos;s</span>
        <span className="ml-2">Market</span>
      </span>

      {/* Desktop menu */}
      <div className="items-center justify-between hidden sm:flex">
        <MenuList />
      </div>

      {/* Navigation icons */}
      <div className="flex items-center gap-2">
        {/* Desktop icons */}
        <div className="items-center hidden sm:flex gap-1">
          <button
            onClick={() => router.push("/all-products")}
            className="p-2.5 rounded-md hover:bg-red-50 dark:hover:bg-card/50 transition-colors text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            aria-label="Buscar productos"
          >
            <Search strokeWidth="1.5" className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="p-2.5 rounded-md hover:bg-red-50 dark:hover:bg-card/50 transition-colors text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 relative"
            aria-label={`Carrito de compras${cartCount > 0 ? ` - ${cartCount} artículos` : ""}`}
          >
            {cartCount === 0 ? (
              <ShoppingCart strokeWidth="1.5" className="w-5 h-5" />
            ) : (
              <BaggageClaim strokeWidth="1.5" className="w-5 h-5" />
            )}
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-900 dark:bg-red-500 text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => router.push("/loved-products")}
            className="p-2.5 rounded-md hover:bg-red-50 dark:hover:bg-card/50 transition-colors text-red-900 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
            aria-label={`Favoritos${lovedItems.length > 0 ? ` - ${lovedItems.length} productos` : ""}`}
          >
            <Heart
              strokeWidth="1.5"
              className={`w-5 h-5 ${lovedItems.length > 0 ? "fill-current" : ""}`}
            />
          </button>
          <ToggleTheme />
        </div>

        {/* Mobile icons */}
        <div className="flex items-center sm:hidden gap-1">
          <button
            onClick={() => router.push("/all-products")}
            className="p-2.5 rounded-md text-red-900 dark:text-red-500"
            aria-label="Buscar productos"
          >
            <Search strokeWidth="1.5" className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push("/cart")}
            className="p-2.5 rounded-md text-red-900 dark:text-red-500 relative"
            aria-label={`Carrito${cartCount > 0 ? ` - ${cartCount}` : ""}`}
          >
            {cartCount === 0 ? (
              <ShoppingCart strokeWidth="1.5" className="w-5 h-5" />
            ) : (
              <BaggageClaim strokeWidth="1.5" className="w-5 h-5" />
            )}
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-900 dark:bg-red-500 text-white text-xs font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <ItemsMenuMobile />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
