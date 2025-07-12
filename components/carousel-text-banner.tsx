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
    title: "¡Completa tu Despensa!",
    description: "Todo lo que necesitas, listo para llevarte.",
  },
  {
    id: 4,
    title: "Combina y Ahorra",
    description: "Lleva los esenciales en un solo pedido.",
  },
]

const CarouselTextBanner = () => {
  return ( 
    <div className="relative bg-cover bg-center bg-[url('/carousel.jpg')] dark:bg-[url('/dark-carousel.jpg')]">
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <Carousel 
        className="w-full max-w-10xl mx-auto relative z-10" 
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({id, title, description}) => (
            <CarouselItem key={id} className="cursor-default">
              <div>
                <Card className="shadow-none border-none bg-transparent">
                  <CardContent className="flex flex-col justify-center p-2 items-center text-center">
                    <p className="text-white sm:text-lg text-wrap">{title}</p>
                    <p className="text-white text-xs sm:text-sm text-wrap">{description}</p>
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