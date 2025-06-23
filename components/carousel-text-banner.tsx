"use client"

import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay"

export const dataCarouselTop = [
  {
    id: 1,
    title: "¡Pide ya!",
    description: "Envíos rápidos y seguros.",
  },
  {
    id: 2,
    title: "¿Personalizamos tu pedido?",
    description: "¡Contáctanos!",
  },
  {
    id: 3,
    title: "¡Despensa Completa en un Solo Pedido!",
    description: "Todo lo que necesitas, listo para llevarte.",
  },
  {
    id: 4,
    title: "Combina y Ahorra con Básicos Imprescindibles",
    description: "Lleva los esenciales en un solo pedido.",
  },
]

const CarouselTextBanner = () => {

  return ( 
    <div className="bg-gray-200 dark:bg-primary">
      <Carousel className="w-full max-w-10xl mx-auto" plugins={[
        Autoplay({
          delay: 5000
        })
      ]}>
          <CarouselContent>
            {dataCarouselTop.map(({id, title, description}) => (
              <CarouselItem key={id} className="cursor-default">
                <div>
                  <Card className="shadow-none border-none bg-transparent">
                    <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                      <p className="sm:text-lg text-wrap dark:text-secondary">{title}</p>
                      <p className="text-xs sm:text-sm text-wrap dark:text-secondary">{description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
      </Carousel>
    </div>
   );
}
 
export default CarouselTextBanner;