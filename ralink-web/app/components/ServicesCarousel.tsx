"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Wifi, Home, Tv, ShieldCheck } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export function ServicesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const slides = [
    {
      title: "Internet de Alta Velocidad",
      description: "Conexión estable para tu hogar y oficina.",
      icon: Wifi,
      color: "bg-primary/20",
      textColor: "text-primary"
    },
    {
      title: "Entretenimiento sin límites",
      description: "Disfruta de streaming en 4K sin interrupciones.",
      icon: Tv,
      color: "bg-secondary/20",
      textColor: "text-secondary"
    },
    {
      title: "Cobertura Total",
      description: "Llegamos a donde otros no llegan.",
      icon: Home,
      color: "bg-orange-500/20",
      textColor: "text-orange-500"
    },
    {
      title: "Soporte Local",
      description: "Atención rápida y personalizada.",
      icon: ShieldCheck,
      color: "bg-blue-500/20",
      textColor: "text-blue-500"
    }
  ];

  return (
    <section className="py-12 bg-background/50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 gradient-text">
          Nuestros Servicios en Acción
        </h2>
        <div className="flex justify-center">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-4xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm card-glow">
                      <CardContent className="flex flex-col items-center justify-center aspect-square p-6 text-center">
                        <div className={`p-4 rounded-full mb-4 ${slide.color}`}>
                           <slide.icon className={`w-12 h-12 ${slide.textColor}`} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-foreground">{slide.title}</h3>
                        <p className="text-sm text-muted-foreground">{slide.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Las flechas van dentro del carrusel (ver ui/carousel.tsx). El default
                de shadcn las saca 48px hacia afuera y en pantallas angostas eso
                provocaba 24px de scroll horizontal en toda la página. */}
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
