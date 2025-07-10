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
          <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>Sobre Nosotros</NavigationMenuTrigger>
          <NavigationMenuContent className="z-50">
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-2">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium">
                      Bronco&apos;s Market
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Nos dedicamos a ofrecerte productos de alta calidad a precios accesibles, con la comodidad que tu familia merece. Somos tu aliado en el día a día, brindando desde combos completos hasta los ingredientes más frescos para tu hogar.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/shop" title="Tienda">
                Accede a toda tu información, tus pedidos y mucho más.
              </ListItem>
              <ListItem href="/offers" title="Ofertas">
                Sección dedicada a promociones y descuentos especiales.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default MenuList;

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Combos",
    href: "/category/combos",
    description:
      "Paquetes completos y económicos para todas tus necesidades.",
  },
  {
    title: "Lácteos",
    href: "/category/lacteos",
    description:
     "Quesos, leche, mantequilla y más. Nutrición y sabor en cada opción.",
  },
  {
    title: "Cárnicos",
    href: "/category/carnicos",
    description:
      "Cortes selectos de carne de cerdo, pollo, res y embutidos.",
  },
  {
    title: "Bebidas",
    href: "/category/bebidas",
    description: "Refrescos, jugos, café y otras bebidas para hidratarte.",
  },
  {
    title: "Confituras",
    href: "/category/confituras",
    description:
      "Dulces, azúcar y productos para endulzar tu día.",
  },
  {
    title: "Otros",
    href: "/category/otros",
    description:
      "Aceites, pastas, condimentos y artículos variados.",
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
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
