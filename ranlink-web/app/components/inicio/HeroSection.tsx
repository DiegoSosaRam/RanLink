import Link from "next/link";
import { Building2, ClipboardList, Home, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundDecorations } from "../BackgroundDecorations";
import { SectionHeader } from "../SectionHeader";
import { NOMBRE_COMERCIAL, whatsappDisponible, whatsappHref } from "@/lib/constants";

// Accesos rápidos a las secciones. Son enlaces, no promesas de servicio:
// la propuesta de valor de la marca está pendiente.
const ACCESOS = [
  { icon: Home, label: "Internet hogar", href: "#planes" },
  { icon: Building2, label: "Internet empresarial", href: "#servicios" },
  { icon: ClipboardList, label: "Requisitos", href: "#requisitos" },
  { icon: MapPin, label: "Cobertura", href: "#cobertura" },
];

export function HeroSection() {
  const conWhatsApp = whatsappDisponible();

  return (
    <section id="inicio" className="hero-gradient relative overflow-hidden">
      <BackgroundDecorations />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 md:pt-40">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
            <span className="text-sm text-muted-foreground">Internet para hogar y empresa</span>
          </div>

          <SectionHeader
            title="Conéctate con"
            highlightedText={NOMBRE_COMERCIAL}
            description="Planes de internet para tu hogar y tu negocio. Consulta la cobertura en tu zona y contrata con la ayuda de un asesor."
            className="animate-slide-up [&_h2]:text-4xl [&_h2]:md:text-6xl"
          />

          <div className="animate-slide-up mb-16 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row" style={{ animationDelay: "0.2s" }}>
            <Button asChild variant="hero" size="xl">
              <a href="#planes">Ver planes</a>
            </Button>
            <Button asChild variant="outline" size="xl">
              {conWhatsApp ? (
                <a href={whatsappHref("Hola, quisiera consultar la cobertura en mi zona.")} target="_blank" rel="noopener noreferrer">
                  Consultar cobertura
                </a>
              ) : (
                <Link href="/#cobertura">Consultar cobertura</Link>
              )}
            </Button>
          </div>

          <div className="animate-slide-up grid w-full max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4" style={{ animationDelay: "0.3s" }}>
            {ACCESOS.map((acceso) => (
              <a
                key={acceso.label}
                href={acceso.href}
                className="card-glow flex items-center gap-3 rounded-xl border border-border/50 bg-card/60 px-4 py-3 text-left"
              >
                <acceso.icon className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium text-foreground">{acceso.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Onda inferior que enlaza con la sección de planes */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="block w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z"
            fill="hsl(var(--card))"
          />
        </svg>
      </div>
    </section>
  );
}
