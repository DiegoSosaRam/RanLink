import Link from "next/link";
import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../SectionHeader";
import { BloquePendiente } from "../BloquePendiente";
import { Dato } from "../Pendiente";
import { WhatsAppIcon } from "../WhatsAppIcon";
import { COSTO_INSTALACION, PLANES, VISOR_TARIFAS_URL, whatsappDisponible, whatsappHref } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";
import { cn } from "@/lib/utils";

/** Planes vigentes. Mientras PLANES esté vacío se muestra el espacio reservado. */
export function PricingSection() {
  const conWhatsApp = whatsappDisponible();

  return (
    <section id="planes" className="scroll-mt-24 bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          title="Planes"
          highlightedText="a tu medida"
          description="Elige el plan que mejor se adapte a tu hogar o negocio. Cada plan muestra su velocidad, precio mensual y folio de tarifa."
        />

        {PLANES.length === 0 ? (
          <BloquePendiente
            titulo="Planes y precios pendientes de publicación"
            descripcion="Aquí aparecerán los planes vigentes con su velocidad, precio mensual y folio de inscripción de la tarifa."
            className="mx-auto min-h-[320px] max-w-4xl"
          >
            <Button asChild variant="gold" size="sm" className="mt-2">
              <Link href={RUTAS.quieroContratar}>Solicitar información</Link>
            </Button>
          </BloquePendiente>
        ) : (
          <div className={cn("mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2", PLANES.length === 3 ? "max-w-6xl lg:grid-cols-3" : "max-w-7xl lg:grid-cols-4")}>
            {PLANES.map((plan) => (
              <div
                key={plan.nombre}
                className={cn(
                  "card-glow relative flex flex-col overflow-hidden rounded-2xl border border-border bg-background",
                  plan.destacado && "ring-2 ring-primary",
                )}
              >
                {plan.destacado && (
                  <div className="absolute right-0 top-0 z-10 rounded-bl-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    POPULAR
                  </div>
                )}
                <div className="bg-gradient-to-br from-brand-azul to-brand-cielo px-6 py-6 text-center">
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/90">{plan.tecnologia ?? "Internet"}</p>
                  <p className="text-4xl font-black text-white">{plan.velocidad}</p>
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="mb-8 border-b border-border/50 pb-8 text-center">
                    <p className="text-5xl font-black text-foreground">{plan.precio}</p>
                    <p className="text-sm font-medium text-muted-foreground">al mes</p>
                    <p className="mt-2 text-xs text-muted-foreground">Folio de tarifa: <Dato valor={plan.folioTarifa} /></p>
                  </div>
                  <ul className="mb-8 flex-1 space-y-4">
                    {/* Las características de cada plan están pendientes. */}
                    {plan.caracteristicas.map((c) => (
                      <li key={c} className="flex items-start gap-3">
                        <span className="mt-1 rounded-full bg-primary/10 p-1">
                          <Check className="h-3 w-3 text-primary" />
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">{c}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant={plan.destacado ? "gold" : "outline"} className="w-full py-6 text-lg font-bold">
                    {conWhatsApp ? (
                      <a
                        href={whatsappHref(`Hola, me interesa contratar el plan ${plan.nombre} de ${plan.velocidad}.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ¡Contratar!
                      </a>
                    ) : (
                      <Link href={RUTAS.quieroContratar}>¡Contratar!</Link>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Paquete de instalación */}
        <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-background to-muted p-8 text-center shadow-2xl md:p-12">
          <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <div className="relative">
            <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Costo de instalación</h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Pago único para dejar tu servicio funcionando. Pregunta a un asesor qué incluye.
            </p>
            <div className="mb-8 inline-block rounded-2xl border border-border bg-card/60 px-8 py-6 backdrop-blur-sm">
              <span className="mb-2 block text-sm uppercase tracking-widest text-muted-foreground">Precio total</span>
              <Dato valor={COSTO_INSTALACION} className="gradient-text text-5xl font-black" />
            </div>
            {conWhatsApp && (
              <div className="flex flex-col items-center gap-4">
                <a
                  href={whatsappHref("Hola, quisiera información sobre la instalación.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-[#20bd5a] active:scale-95"
                >
                  <WhatsAppIcon className="h-6 w-6" />
                  Informes por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-sm text-muted-foreground">
          Consulta todas las tarifas inscritas en el{" "}
          <a href={VISOR_TARIFAS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
            visor oficial de tarifas de la CRT
            <ExternalLink className="h-3 w-3" />
          </a>
          .
        </p>
      </div>
    </section>
  );
}
