import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundDecorations } from "../BackgroundDecorations";
import { SectionHeader } from "../SectionHeader";
import { Dato } from "../Pendiente";
import {
  CORREO_CONTACTO,
  HORARIO,
  TELEFONO,
  correoHref,
  telefonoHref,
  whatsappDisponible,
  whatsappHref,
} from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

export function ContactSection() {
  const tel = telefonoHref();
  const correo = correoHref(CORREO_CONTACTO);
  const conWhatsApp = whatsappDisponible();

  // Cada tarjeta solo es enlace si el dato existe; si no, muestra el marcador.
  const tarjetas = [
    { icon: Phone, titulo: "Llámanos", href: tel, valor: <Dato valor={TELEFONO} className="text-lg" />, externo: false },
    { icon: Mail, titulo: "Escríbenos", href: correo, valor: <Dato valor={CORREO_CONTACTO} className="break-all" />, externo: false },
    {
      icon: MessageCircle,
      titulo: "WhatsApp",
      href: conWhatsApp ? whatsappHref() : null,
      valor: conWhatsApp ? <span>Chatea con nosotros</span> : <Dato valor="PENDIENTE" />,
      externo: true,
    },
  ];

  return (
    <section id="contacto" className="relative scroll-mt-24 overflow-hidden bg-card py-24">
      <BackgroundDecorations variant="mixed" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          title="¿Listo para"
          highlightedText="conectarte?"
          description="Contáctanos y un asesor te ayudará a elegir el plan adecuado para ti."
        />

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tarjetas.map((t) => {
            const contenido = (
              <>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 transition-transform group-hover:scale-110">
                  <t.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-2 font-bold text-foreground">{t.titulo}</h3>
                <div className="font-semibold text-primary">{t.valor}</div>
              </>
            );
            const clases = "card-glow group flex flex-col items-center rounded-2xl border border-border bg-background/80 p-8 text-center backdrop-blur-sm";
            return t.href ? (
              <a key={t.titulo} href={t.href} className={clases} {...(t.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                {contenido}
              </a>
            ) : (
              <div key={t.titulo} className={clases}>
                {contenido}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="mb-6 text-muted-foreground">
            Horario de atención: <Dato valor={HORARIO} />
          </p>
          <Button asChild variant="hero" size="xl">
            <Link href={RUTAS.quieroContratar}>¡Contratar ahora!</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
