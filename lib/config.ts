export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const DELIVERY_PRICES: Record<string, number> = {
  cienfuegos: 0,
  palmira: 5,
  rodas: 10,
  abreus: 10,
  "aguada-de-pasajeros": 18,
  cruces: 10,
  lajas: 14,
  cumanayagua: 10,
};

export const TOWNS = [
  { value: "cienfuegos", label: "Cienfuegos", price: "Gratis" },
  { value: "palmira", label: "Palmira", price: "$5" },
  { value: "rodas", label: "Rodas", price: "$10" },
  { value: "abreus", label: "Abreus", price: "$10" },
  { value: "aguada-de-pasajeros", label: "Aguada de Pasajeros", price: "$18" },
  { value: "cruces", label: "Cruces", price: "$10" },
  { value: "lajas", label: "Lajas", price: "$14" },
  { value: "cumanayagua", label: "Cumanayagua", price: "$10" },
];

export const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "5358527122";

export const STRAPI_CATEGORIES = [
  { href: "/category/combos", text: "Combos" },
  { href: "/category/lacteos", text: "Lácteos" },
  { href: "/category/carnicos", text: "Cárnicos" },
  { href: "/category/bebidas", text: "Bebidas" },
  { href: "/category/confituras", text: "Confituras" },
  { href: "/category/otros", text: "Otros" },
];
