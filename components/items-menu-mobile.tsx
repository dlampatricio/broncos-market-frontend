"use client";

import { useEffect, useState } from "react";
import { Menu, ShoppingCart, Heart, Sun, Moon, Home, Info, BaggageClaim, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { STRAPI_CATEGORIES } from "@/lib/config";

const ItemsMenuMobile = () => {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const cart = useCart();
  const { lovedItems } = useLovedProducts();

  useEffect(() => setMounted(true), []);

  const toggleDrawer = (isOpen: boolean) => () => setOpen(isOpen);

  if (!mounted) {
    return (
      <button className="p-1 text-red-900 dark:text-red-500">
        <Menu className="w-6 h-6" />
      </button>
    );
  }

  const iconColor = "text-red-900 dark:text-red-500";

  return (
    <>
      <button onClick={toggleDrawer(true)} className="p-1 text-red-900 dark:text-red-500">
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleDrawer(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-card border-l border-border z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 text-center border-b border-border">
          <div className="flex items-center justify-between mb-1">
            <span />
            <h2 className="text-lg font-bold text-red-900 dark:text-red-500">
              BRONCO&apos;S MARKET
            </h2>
            <button onClick={toggleDrawer(false)} className="text-muted-foreground hover:text-foreground">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Lo esencial llega a tu puerta</p>
        </div>

        {/* Navigation */}
        <nav className="py-2">
          <Link
            href="/"
            onClick={toggleDrawer(false)}
            className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-accent transition-colors"
          >
            <Home size={20} className={iconColor} />
            <span className="font-medium">Inicio</span>
          </Link>

          <div className="px-6 pt-4 pb-1 text-xs font-semibold text-red-900 dark:text-red-500 tracking-wider">
            CATEGORÍAS
          </div>

          {STRAPI_CATEGORIES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={toggleDrawer(false)}
              className="block px-6 py-2.5 hover:bg-red-50 dark:hover:bg-accent transition-colors"
            >
              <span className="font-medium text-sm">{item.text}</span>
            </Link>
          ))}

          <Link
            href="/all-products"
            onClick={toggleDrawer(false)}
            className="block px-6 py-2.5 hover:bg-red-50 dark:hover:bg-accent transition-colors"
          >
            <span className="font-medium text-sm">Todos los Productos</span>
          </Link>
        </nav>

        <div className="mx-4 border-t border-border" />

        {/* Actions */}
        <nav className="py-2">
          <button
            onClick={() => { router.push("/cart"); setOpen(false); }}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-accent transition-colors relative"
          >
            {cart.items.length > 0 ? (
              <BaggageClaim size={20} className={iconColor} />
            ) : (
              <ShoppingCart size={20} className={iconColor} />
            )}
            <span className="font-medium">Carrito</span>
            {cart.items.length > 0 && (
              <span className="absolute right-6 w-5 h-5 flex items-center justify-center rounded-full bg-red-900 dark:bg-red-500 text-white text-xs font-bold">
                {cart.items.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { router.push("/loved-products"); setOpen(false); }}
            className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-accent transition-colors"
          >
            <Heart
              size={20}
              className={iconColor}
              fill={lovedItems.length > 0 ? "currentColor" : "none"}
            />
            <span className="font-medium">Favoritos</span>
          </button>

          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="w-full flex items-center justify-between px-6 py-3 hover:bg-red-50 dark:hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              {currentTheme === "dark" ? (
                <Moon size={20} className={iconColor} />
              ) : (
                <Sun size={20} className={iconColor} />
              )}
              <span className="font-medium">{currentTheme === "dark" ? "Modo oscuro" : "Modo claro"}</span>
            </div>
            <div
              className={`w-10 h-5 rounded-full transition-colors ${
                currentTheme === "dark" ? "bg-red-500" : "bg-red-900"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition-transform mt-0.5 ${
                  currentTheme === "dark" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </button>
        </nav>

        <div className="mx-4 border-t border-border" />

        {/* Info */}
        <nav className="py-2">
          <Link
            href="/about-us"
            onClick={toggleDrawer(false)}
            className="flex items-center gap-3 px-6 py-3 hover:bg-red-50 dark:hover:bg-accent transition-colors"
          >
            <Info size={20} className={iconColor} />
            <span className="font-medium">Sobre nosotros</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ItemsMenuMobile;
