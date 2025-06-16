'use client'

import { Button } from "@/components/ui/button";
import Image  from "next/image";
import { useRouter } from "next/navigation";

const PageSuccess = () => {

  const router = useRouter();

  return ( 
    <div className="max-w-5xl p-4 mx-auto sm:py-16 sm:px-24">
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <div className="flex justify-center md:min-w-[400px]">
          <Image src="/success.jpg" alt="Compra Exitosa" width={250} height={500} className="rounded-lg" />
        </div>
      <div>
        <h1 className="text-3xl">¡Gracias por su compra en <strong>Bronco&apos;s</strong> Market!</h1>
        <p className="my-3">Su pedido ha sido procesado con éxito. En breve, nuestro equipo se comunicará con usted vía WhatsApp para confirmar los detalles y coordinar la entrega.</p>
        <p className="my-3">¡Disfrute su pedido!</p>
        <Button onClick={() => router.push("/")} className="cursos-pointer">
          Volver a la tienda
        </Button> 
      </div>
      </div>
    </div>
   );
}
 
export default PageSuccess;