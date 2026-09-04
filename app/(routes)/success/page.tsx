"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col-reverse gap-6 sm:flex-row items-center">
        <div className="flex justify-center md:min-w-[400px]">
          <Image
            src="/success.jpg"
            alt="Compra Exitosa"
            width={250}
            height={500}
            className="rounded-lg"
            priority
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl sm:text-3xl font-bold">
              ¡Gracias por tu compra!
            </h1>
          </div>
          <p className="my-3 text-muted-foreground">
            Su pedido ha sido procesado con éxito. En breve, nuestro equipo se comunicará con
            usted vía WhatsApp para confirmar los detalles y coordinar la entrega.
          </p>
          <p className="my-3 font-medium">¡Disfrute su pedido!</p>
          <Button onClick={() => router.push("/")} className="mt-4">
            Volver a la tienda
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
