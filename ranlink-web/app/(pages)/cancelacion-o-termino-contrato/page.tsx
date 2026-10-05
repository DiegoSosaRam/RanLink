import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, MessageSquare, Phone, Mail, ClipboardList, Trash2, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato, Pendiente } from "@/components/Pendiente";
import {
  NOMBRE_COMERCIAL,
  TELEFONO,
  WHATSAPP,
  CORREO_CONTACTO,
  correoHref,
  telefonoHref,
  whatsappDisponible,
  whatsappHref,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Cancelación o Término de Contrato | ${NOMBRE_COMERCIAL}`,
  description: `Información sobre el proceso de cancelación y terminación de los servicios de ${NOMBRE_COMERCIAL}.`,
};

/** Estructura de pasos; los detalles operativos de cada empresa quedan pendientes. */
const pasos = [
  {
    title: "1. Inicia tu trámite",
    icon: MessageSquare,
    description: (
      <>
        Puedes iniciar tu proceso de cancelación contactando a nuestro departamento de atención. Ten a la mano tu número
        de contrato y una identificación.
      </>
    ),
  },
  {
    title: "2. Devolución de Equipos",
    icon: Trash2,
    description: (
      <>
        Si el servicio incluye equipos proporcionados por {NOMBRE_COMERCIAL}, deberán devolverse al terminar el
        contrato. Lugar y forma de devolución: <Pendiente />.
      </>
    ),
  },
  {
    title: "3. Liquidación de Adeudos",
    icon: ClipboardList,
    description: (
      <>
        Se realizará un corte a la fecha para determinar si existen saldos pendientes. Plazos y condiciones de
        liquidación: <Pendiente />.
      </>
    ),
  },
];

export default function CancelacionPage() {
  const telHref = telefonoHref();
  const correo = correoHref(CORREO_CONTACTO, "Cancelación o término de contrato");
  const waDisponible = whatsappDisponible();

  return (
    <div className="pb-20">
      <PageHero
        icon={ArrowRight}
        titulo="Cancelación o"
        resaltado="Término de Contrato"
        descripcion="Entendemos que tus necesidades pueden cambiar. Aquí te explicamos el proceso para finalizar tu servicio."
        className="mb-20"
      />

      <div className="mx-auto max-w-5xl space-y-24 px-4 sm:px-6">
        {/* Pasos */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold uppercase tracking-widest text-secondary/80">Pasos a seguir</h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-secondary" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pasos.map((paso) => (
              <div key={paso.title} className="group relative">
                <div className="absolute -inset-1 rounded-[35px] bg-gradient-to-b from-secondary/20 to-transparent opacity-25 blur transition duration-500 group-hover:opacity-50" />
                <div className="relative flex h-full flex-col items-center rounded-[30px] border border-border/50 bg-card/50 p-8 text-center backdrop-blur-xl">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-transform duration-300 group-hover:scale-110">
                    <paso.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold">{paso.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{paso.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Penalizaciones y costos */}
        <section className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[40px] border border-border/50 bg-card/50 p-8 md:p-12">
            <div className="absolute right-0 top-0 p-8 opacity-10">
              <AlertCircle className="h-32 w-32" />
            </div>
            <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                <AlertCircle className="h-10 w-10 text-secondary" />
              </div>
              <div className="w-full">
                <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-foreground">
                  Condiciones de la cancelación
                </h2>
                <BloquePendiente
                  titulo="Condiciones pendientes"
                  descripcion="Costos, penalizaciones, plazos de atención y constancia de cancelación se publicarán junto con el contrato de adhesión."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section className="py-10 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-secondary">
            <MessageSquare className="h-4 w-4" />
            ¿Tienes dudas?
          </div>
          <h2 className="mb-12 text-3xl font-bold">
            Contacta con nuestro departamento de <span className="gradient-text">Atención a Clientes</span>
          </h2>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {/* WhatsApp: si el número está pendiente, el enlace lleva a la sección de contacto */}
            <a
              href={whatsappHref("Hola, quiero información sobre la cancelación de mi contrato.")}
              {...(waDisponible ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group"
            >
              <div className="flex h-full items-center gap-6 rounded-[30px] border border-border/50 bg-card p-8 text-left transition-colors hover:bg-muted/50">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground">
                    {waDisponible ? "WhatsApp" : "Contáctanos"}
                  </h4>
                  <p className="break-words text-xl font-black text-secondary">
                    <Dato valor={WHATSAPP} />
                  </p>
                </div>
              </div>
            </a>

            {/* Teléfono */}
            {telHref ? (
              <a href={telHref} className="group">
                <div className="flex h-full items-center gap-6 rounded-[30px] border border-border/50 bg-card p-8 text-left transition-colors hover:bg-muted/50">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Phone className="h-7 w-7" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground">
                      Atención Telefónica
                    </h4>
                    <p className="break-words text-xl font-black text-secondary">{TELEFONO}</p>
                  </div>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-6 rounded-[30px] border border-border/50 bg-card p-8 text-left">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Phone className="h-7 w-7" />
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground">
                    Atención Telefónica
                  </h4>
                  <p className="text-xl font-black text-secondary">
                    <Dato valor={TELEFONO} />
                  </p>
                </div>
              </div>
            )}

            {/* Correo */}
            {correo ? (
              <a href={correo} className="group">
                <div className="flex h-full items-center gap-6 rounded-[30px] border border-border/50 bg-card p-8 text-left transition-colors hover:bg-muted/50">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground">Correo</h4>
                    <p className="break-all text-base font-black text-secondary">{CORREO_CONTACTO}</p>
                  </div>
                </div>
              </a>
            ) : (
              <div className="flex items-center gap-6 rounded-[30px] border border-border/50 bg-card p-8 text-left">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Mail className="h-7 w-7" />
                </div>
                <div className="min-w-0">
                  <h4 className="mb-1 text-xs font-bold uppercase tracking-widest text-foreground">Correo</h4>
                  <p className="text-xl font-black text-secondary">
                    <Dato valor={CORREO_CONTACTO} />
                  </p>
                </div>
              </div>
            )}
          </div>

          {!waDisponible && !telHref && !correo && (
            <p className="mt-8 text-sm text-muted-foreground">
              Los canales de atención se publicarán pronto. Mientras tanto, usa la{" "}
              <Link href="/#contacto" className="font-semibold text-primary underline-offset-4 hover:underline">
                sección de contacto
              </Link>
              .
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
