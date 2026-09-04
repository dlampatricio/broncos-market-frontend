"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <PackageOpen className="h-20 w-20 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold mb-2">Página no encontrada</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        Lo sentimos, la página que buscas no existe o fue movida a otra ubicación.
      </p>
      <div className="flex gap-4">
        <Link href="/">
          <Button>Ir al inicio</Button>
        </Link>
        <Link href="/all-products">
          <Button variant="outline">Ver productos</Button>
        </Link>
      </div>
    </div>
  );
}
