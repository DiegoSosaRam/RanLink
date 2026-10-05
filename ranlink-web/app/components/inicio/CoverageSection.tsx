import Link from "next/link";
import { Clock, ExternalLink, MapPin, Phone, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../SectionHeader";
import { BloquePendiente } from "../BloquePendiente";
import { Dato } from "../Pendiente";
import {
  DOMICILIO,
  HORARIO,
  MAPA_EMBED_URL,
  MAPA_URL,
  NOMBRE_COMERCIAL,
  TELEFONO,
  ZONAS_COBERTURA,
  esPendiente,
  whatsappDisponible,
  whatsappHref,
} from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

/**
 * Cobertura. Las zonas y el mapa están pendientes: se deja el espacio
 * previsto, sin inventar localidades ni polígonos.
 */
export function CoverageSection() {
  const conWhatsApp = whatsappDisponible();

  const tarjetas = [
    { icon: Wallet, titulo: "Puntos de pago", texto: <Dato valor="PENDIENTE" /> },
    { icon: Clock, titulo: "Horario de atención", texto: <Dato valor={HORARIO} /> },
    { icon: Phone, titulo: "Línea directa", texto: <Dato valor={TELEFONO} /> },
  ];

  return (
    <section id="cobertura" className="hero-gradient relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          title="Consulta nuestra"
          highlightedText="cobertura"
          description="¿Quieres saber si hay servicio en tu domicilio? Revisa nuestras zonas de cobertura."
        />

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tarjetas.map((t) => (
            <div key={t.titulo} className="card-glow flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/15">
                <t.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground">{t.titulo}</h3>
                <div className="mt-1 text-sm text-muted-foreground">{t.texto}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h3 className="mb-6 text-center text-xl font-bold text-foreground">Zonas con cobertura</h3>

          {ZONAS_COBERTURA.length === 0 ? (
            <BloquePendiente
              titulo="Zonas de cobertura pendientes de publicación"
              descripcion="Aquí aparecerán las localidades donde se presta el servicio."
              className="mx-auto max-w-2xl"
            />
          ) : (
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
              {ZONAS_COBERTURA.map((zona) => (
                <div key={zona.nombre} className="flex items-center gap-2 rounded-xl border border-border bg-background p-4">
                  <span className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-sm font-medium text-foreground">{zona.nombre}</span>
                  {zona.tecnologia && (
                    <span className="ml-auto rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {zona.tecnologia}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Espacio previsto para el mapa de cobertura */}
          <BloquePendiente
            titulo="Mapa de cobertura pendiente"
            descripcion="En este espacio se mostrará el mapa con las zonas de servicio."
            className="mt-8 min-h-[280px]"
          />

          {/* Centro de atención a clientes */}
          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center rounded-2xl border border-border bg-background p-6 sm:p-8">
              <h4 className="mb-6 text-lg font-bold text-foreground">Centro de atención a clientes</h4>
              <div className="space-y-5">
                {[
                  { icon: MapPin, titulo: "Domicilio", valor: DOMICILIO },
                  { icon: Clock, titulo: "Horario de atención", valor: HORARIO },
                  { icon: Phone, titulo: "Teléfono y WhatsApp", valor: TELEFONO },
                ].map((fila) => (
                  <div key={fila.titulo} className="flex items-start gap-3">
                    <fila.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{fila.titulo}</p>
                      <p className="text-sm text-muted-foreground">
                        <Dato valor={fila.valor} />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {esPendiente(DOMICILIO) ? (
              <BloquePendiente titulo="Ubicación del centro de atención pendiente" className="min-h-[320px]" />
            ) : (
              <div className="flex min-h-[320px] flex-col overflow-hidden rounded-2xl border border-border">
                <iframe
                  title={`Ubicación del centro de atención de ${NOMBRE_COMERCIAL}`}
                  src={MAPA_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="min-h-[320px] w-full flex-1 border-0"
                />
                <a
                  href={MAPA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border-t border-border bg-background px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-muted"
                >
                  <MapPin className="h-4 w-4" />
                  Abrir en Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">¿No encuentras tu zona? Contáctanos para verificar disponibilidad.</p>
            <Button asChild variant="gold">
              {conWhatsApp ? (
                <a href={whatsappHref("Hola, quisiera consultar la cobertura en mi zona.")} target="_blank" rel="noopener noreferrer">
                  Consultar cobertura
                </a>
              ) : (
                <Link href={RUTAS.quieroContratar}>Solicitar información</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
