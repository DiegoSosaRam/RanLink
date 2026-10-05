import Link from "next/link";
import { Building2, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundDecorations } from "../BackgroundDecorations";
import { SectionHeader } from "../SectionHeader";
import { NOMBRE_COMERCIAL } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

const SERVICIOS = [
  {
    icon: Wifi,
    titulo: "Internet hogar",
    descripcion: `Conecta a toda tu familia con ${NOMBRE_COMERCIAL}. Revisa los planes disponibles para tu hogar y elige el que mejor se adapte a ti.`,
    cta: "Ver planes",
    href: "/#planes",
  },
  {
    icon: Building2,
    titulo: "Internet empresarial",
    descripcion: "Conectividad para tu negocio. Cuéntanos qué necesitas y un asesor te preparará una cotización.",
    cta: "Cotizar",
    href: RUTAS.empresarial,
  },
];

export function ServicesSection() {
  return (
    <section id="servicios" className="hero-gradient relative scroll-mt-24 overflow-hidden py-24">
      <BackgroundDecorations variant="mixed" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader title="Nuestros" highlightedText="servicios" description="Soluciones de conectividad para hogares y empresas." />

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICIOS.map((servicio) => (
            <div key={servicio.titulo} className="card-glow group relative flex flex-col rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform duration-300 group-hover:scale-110">
                <servicio.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">{servicio.titulo}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">{servicio.descripcion}</p>
              <Button asChild variant="gold" size="sm" className="w-full">
                <Link href={servicio.href}>{servicio.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
