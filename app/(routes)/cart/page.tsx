"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format-price";
import CartItem from "./components/cart-item";
import { TownsCombobox } from "@/app/(routes)/cart/components/towns-combobox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { DELIVERY_PRICES, WHATSAPP_PHONE } from "@/lib/config";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, removeAll, updateQuantity } = useCart();
  const [selectedTown, setSelectedTown] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const totalPrice = items.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const delivery = selectedTown ? DELIVERY_PRICES[selectedTown] || 0 : 0;

  const handleBuyClick = () => {
    const productsList = items
      .map((item) => {
        return `- ${item.productName} (${formatPrice(item.price)} x ${item.quantity} = ${formatPrice(item.price * item.quantity)})`;
      })
      .join("%0A");

    const message = `Nuevo pedido:%0A%0ANombre: ${name}%0ATeléfono: ${phone}%0A%0AProductos:%0A${productsList}%0A%0AMunicipio de entrega: ${selectedTown}%0ADirección: ${address}%0APrecio Productos: ${formatPrice(totalPrice)}%0APrecio Envío: ${formatPrice(delivery)}%0ATotal a Pagar: ${formatPrice(totalPrice + delivery)}`;

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${message}`, "_blank");
    router.push("/success");
    removeAll();
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-red-900 dark:text-red-500 mb-6">
          Carrito de Compra
        </h1>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {items.length === 0 ? (
            <div className="p-8 text-center bg-muted/50 rounded-lg border border-border flex flex-col items-center gap-4">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-muted-foreground">No hay productos en el carrito</p>
              <Link href="/all-products">
                <Button variant="outline">Explorar productos</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  onQuantityChange={(qty) => updateQuantity(item.id, qty)}
                />
              ))}
            </ul>
          )}
        </div>

        <div>
          <div className="p-6 space-y-6 bg-muted/30 rounded-lg border border-border">
            <h2 className="text-xl font-semibold text-red-900 dark:text-red-500 text-center">
              Resumen del pedido
            </h2>
            <Separator className="bg-red-900 dark:bg-red-500" />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({totalItems} {totalItems === 1 ? "artículo" : "artículos"})
                </span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className={`font-medium ${selectedTown ? "" : "text-orange-500"}`}>
                  {selectedTown ? formatPrice(delivery) : "Seleccione municipio"}
                </span>
              </div>

              <Separator className="bg-red-900 dark:bg-red-500" />

              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold">
                  {selectedTown ? formatPrice(totalPrice + delivery) : "---"}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nombre completo</label>
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-border focus:border-red-900 dark:focus:border-red-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Número de teléfono</label>
                <Input
                  placeholder="Tu teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-border focus:border-red-900 dark:focus:border-red-500"
                  required
                  type="tel"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Municipio de entrega</label>
                <TownsCombobox selectedTown={selectedTown} onTownSelect={setSelectedTown} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Dirección exacta</label>
                <Input
                  placeholder="Calle, número, entre calles..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border-border focus:border-red-900 dark:focus:border-red-500"
                  required
                />
              </div>
            </div>

            <Button
              className="w-full py-6 text-base font-medium bg-red-900 hover:bg-red-800 text-white shadow-md transition"
              onClick={handleBuyClick}
              disabled={items.length === 0 || !selectedTown || !address || !name || !phone}
            >
              Finalizar compra
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
