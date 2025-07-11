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

const MenuList = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-red-900 hover:bg-red-50 dark:text-red-500 dark:hover:bg-card/50">
            Categorías
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-50 bg-white dark:bg-card border rounded-md shadow-lg">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList;

const components = [
  {
    title: "Combos",
    href: "/category/combos",
    description: "Paquetes completos y económicos para todas tus necesidades.",
  },
  {
    title: "Lácteos",
    href: "/category/lacteos",
    description: "Quesos, leche, mantequilla y más. Nutrición y sabor en cada opción.",
  },
  {
    title: "Cárnicos",
    href: "/category/carnicos",
    description: "Cortes selectos de carne de cerdo, pollo, res y embutidos.",
  },
  {
    title: "Bebidas",
    href: "/category/bebidas",
    description: "Refrescos, jugos, café y otras bebidas para hidratarte.",
  },
  {
    title: "Confituras",
    href: "/category/confituras",
    description: "Dulces, azúcar y productos para endulzar tu día.",
  },
  {
    title: "Otros",
    href: "/category/otros",
    description: "Aceites, pastas, condimentos y artículos variados.",
  },
]

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