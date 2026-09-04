"use client"

import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useCategories } from "@/lib/api"
import type { CategoryType } from "@/types/category"

const MenuList = () => {
  const { data } = useCategories();
  const categories = data?.data || [];

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-red-900 hover:bg-red-50 dark:text-red-500 dark:hover:bg-card/50">
            Categorías
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white dark:bg-card border rounded-md shadow-lg">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category: CategoryType) => (
                <ListItem
                  key={category.id}
                  title={category.categoryName}
                  href={`/category/${category.slug}`}
                >
                  Explorar productos de {category.categoryName.toLowerCase()}
                </ListItem>
              ))}
              <ListItem title="Todos los productos" href="/all-products">
                Ver el catálogo completo
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList;

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-red-50 hover:text-red-900 focus:bg-red-50 dark:hover:bg-card/50 dark:hover:text-red-400 dark:focus:bg-card/50"
        >
          <div className="text-sm font-medium leading-none text-red-900 dark:text-red-500">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
