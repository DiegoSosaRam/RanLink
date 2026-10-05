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
import { Building2, Headset, Home, MapPin } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

export function ServicesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  // Textos descriptivos, sin promesas de velocidad, tecnología ni cobertura:
  // esos datos dependen de la empresa y siguen pendientes.
  const slides = [
    {
      title: "Internet para tu hogar",
      description: "Planes pensados para conectar a toda la familia.",
      icon: Home,
      color: "bg-primary/15",
      textColor: "text-primary",
    },
    {
      title: "Internet para tu negocio",
      description: "Conectividad para empresas, con cotización a la medida.",
      icon: Building2,
      color: "bg-secondary/15",
      textColor: "text-secondary",
    },
    {
      title: "Consulta tu cobertura",
      description: "Verifica si hay servicio en tu domicilio antes de contratar.",
      icon: MapPin,
      color: "bg-brand-cian/15",
      textColor: "text-primary-glow",
    },
    {
      title: "Atención a clientes",
      description: "Resolvemos tus dudas sobre contratación, pagos y soporte.",
      icon: Headset,
      color: "bg-brand-azul/15",
      textColor: "text-brand-azul dark:text-brand-cielo",
    },
  ];

  return (
    <section className="bg-card py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 gradient-text">
          Todo lo que necesitas para conectarte
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
