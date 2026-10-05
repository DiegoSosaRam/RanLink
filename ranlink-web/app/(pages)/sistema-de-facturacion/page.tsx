import type { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  Receipt,
  Calendar,
  User,
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/PageHero";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato, Pendiente } from "@/components/Pendiente";
import {
  NOMBRE_COMERCIAL,
  FACTURACION_URL,
  CORREO_FACTURACION,
  CORREO_CONTACTO,
  BANCO,
  CUENTA_BANCARIA,
  CLABE,
  BENEFICIARIO,
  FORMAS_DE_PAGO,
  esPendiente,
  correoHref,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Sistema de Facturación | ${NOMBRE_COMERCIAL}`,
  description: `Gestiona tus pagos y solicita tus facturas electrónicas de ${NOMBRE_COMERCIAL} de forma rápida y sencilla.`,
};

/** Datos que se piden para emitir una factura válida. */
const requisitos = [
  "RFC Vigente",
  "Código Postal de tu domicilio fiscal",
  "Régimen Fiscal actualizado",
  "Uso de CFDI (Gastos en general, etc.)",
];

/** Datos bancarios para pagos por depósito o transferencia (todos vienen de constants). */
const datosBancarios = [
  { etiqueta: "Banco", valor: BANCO },
  { etiqueta: "Cuenta", valor: CUENTA_BANCARIA },
  { etiqueta: "CLABE", valor: CLABE },
  { etiqueta: "Beneficiario", valor: BENEFICIARIO },
];

export default function SistemaFacturacionPage() {
  const portalDisponible = !esPendiente(FACTURACION_URL);

  // CTA alternativo que sí funciona mientras el portal no exista
  const correoSolicitud = esPendiente(CORREO_FACTURACION)
    ? null
    : correoHref(CORREO_FACTURACION, "Solicitud de factura");
  const correoSoporte = correoHref(
    esPendiente(CORREO_FACTURACION) ? CORREO_CONTACTO : CORREO_FACTURACION,
    "Actualización de datos de facturación",
  );

  return (
    <div className="pb-20">
      <PageHero
        icon={Receipt}
        etiqueta="Facturación"
        titulo="Control y"
        resaltado="Transparencia"
        descripcion={`En ${NOMBRE_COMERCIAL} creemos que tener el control de tus servicios debe ser algo sencillo. Aquí puedes consultar cómo gestionar tus pagos y tu facturación.`}
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6">
        {/* Acceso al portal */}
        <section className="group relative">
          <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-primary to-secondary opacity-20 blur transition-all duration-1000 group-hover:opacity-30" />
          <Card className="relative overflow-hidden rounded-[40px] border-border/50 bg-card/60 p-6 backdrop-blur-2xl sm:p-8 md:p-12">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="w-full flex-grow space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                  <LayoutDashboard className="h-4 w-4" />
                  {portalDisponible ? "Portal" : "Próximamente"}
                </div>
                <h2 className="text-3xl font-black tracking-tight">Tu Portal de Autogestión</h2>

                {portalDisponible ? (
                  <>
                    <p className="leading-relaxed text-muted-foreground">
                      Descarga tus facturas (XML y PDF) y consulta tus pagos desde el portal de facturación.
                    </p>
                    <div className="pt-4">
                      <Button asChild variant="gold" size="lg" className="h-auto rounded-2xl px-8 py-6 font-bold uppercase tracking-wider">
                        <a href={FACTURACION_URL} target="_blank" rel="noopener noreferrer">
                          Acceder al Portal
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <BloquePendiente
                      titulo="Portal de facturación pendiente"
                      descripcion="El portal para descargar tus facturas se publicará aquí en cuanto esté disponible."
                    />
                    <div className="pt-2">
                      <Button asChild variant="gold" size="lg" className="h-auto rounded-2xl px-8 py-6 font-bold uppercase tracking-wider">
                        {correoSolicitud ? (
                          <a href={correoSolicitud}>
                            Solicitar factura por correo
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </a>
                        ) : (
                          <Link href="/#contacto">
                            Ir a contacto
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Link>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <div className="hidden w-full justify-center md:flex md:w-1/3">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
                  <LayoutDashboard className="relative z-10 h-32 w-32 text-primary" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Formas de pago */}
          <Card className="group relative overflow-hidden rounded-[40px] border-border/50 bg-card/50 p-6 sm:p-10">
            <div className="absolute right-0 top-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
              <CreditCard className="h-32 w-32" />
            </div>
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold">
              <CreditCard className="h-6 w-6 text-primary" />
              Cómo mantenerte conectado
            </h3>
            <div className="space-y-6">
              {FORMAS_DE_PAGO.map((forma) => (
                <div key={forma.titulo} className="space-y-1 rounded-3xl border border-border/50 bg-muted/30 p-6">
                  <p className="font-bold text-foreground">{forma.titulo}</p>
                  <p className="text-sm text-muted-foreground">{forma.detalle}</p>
                </div>
              ))}

              <div className="space-y-4 rounded-3xl border border-border/50 bg-muted/30 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-black text-foreground">Depósito o transferencia</span>
                  <ShieldCheck className="h-5 w-5 shrink-0 text-secondary" />
                </div>
                <dl className="space-y-3 text-sm">
                  {datosBancarios.map((d) => (
                    <div key={d.etiqueta}>
                      <dt className="text-[10px] uppercase tracking-widest text-muted-foreground">{d.etiqueta}</dt>
                      <dd className="break-all font-mono font-bold text-foreground">
                        <Dato valor={d.valor} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <p className="text-xs italic leading-relaxed text-muted-foreground">
                * Tras realizar tu pago, envía tu comprobante a{" "}
                <span className="break-all font-semibold text-secondary">
                  <Dato valor={CORREO_FACTURACION} />
                </span>{" "}
                indicando tu número de contrato para que podamos acreditarlo.
              </p>
            </div>
          </Card>

          {/* Ciclo de pago */}
          <Card className="group relative overflow-hidden rounded-[40px] border-border/50 bg-card/50 p-6 sm:p-10">
            <div className="absolute right-0 top-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
              <Calendar className="h-32 w-32" />
            </div>
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold">
              <Clock className="h-6 w-6 text-secondary" />
              Tu Ciclo de Pago
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold">Fecha límite de pago</h4>
                  <p className="text-sm text-muted-foreground">
                    Realiza tu pago dentro del periodo indicado para garantizar la continuidad de tu servicio. Fecha
                    límite: <Pendiente />.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/50">
                  <Receipt className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold">Tu Factura Electrónica</h4>
                  <p className="text-sm text-muted-foreground">
                    Una vez confirmado tu pago, emitiremos tu factura y la recibirás en el correo que registraste con
                    nosotros.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border/50 bg-muted/30 p-6">
              <HelpCircle className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider">¿Necesitas ayuda con tu facturación?</p>
            </div>
          </Card>
        </div>

        {/* Datos fiscales */}
        <section className="rounded-[40px] border border-border/50 bg-card/50 p-6 sm:p-10">
          <div className="flex flex-col items-center gap-10 md:flex-row">
            <div className="w-full md:w-1/2">
              <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold uppercase">
                <User className="h-6 w-6 shrink-0 text-primary" />
                Datos Fiscales
              </h3>
              <p className="mb-8 text-sm text-muted-foreground">
                Para que tus facturas cumplan con los requisitos del SAT y sean válidas, asegúrate de que tu información
                esté siempre actualizada con nosotros:
              </p>
              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                {requisitos.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/30 p-4 font-semibold"
                  >
                    <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full rounded-[40px] border border-border/50 bg-gradient-to-br from-muted/40 to-transparent p-6 text-center sm:p-10 md:w-1/2">
              <h4 className="mb-4 text-xl font-bold">¿Cambiaste de domicilio o régimen?</h4>
              <p className="mb-8 text-sm text-muted-foreground">
                Notifícanos para que tu facturación siga siendo correcta y sin contratiempos.
              </p>
              <Button asChild variant="outline" className="h-12 rounded-2xl px-10 font-bold uppercase tracking-widest">
                {correoSoporte ? (
                  <a href={correoSoporte}>Contactar Soporte</a>
                ) : (
                  <Link href="/#contacto">Contactar Soporte</Link>
                )}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
