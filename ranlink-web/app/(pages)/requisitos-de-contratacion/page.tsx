import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { FileText, Mail, MapPin, Home, Building2, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/PageHero";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato, Pendiente } from "@/components/Pendiente";
import { COSTO_INSTALACION, NOMBRE_COMERCIAL, ZONAS_COBERTURA, telefonoHref } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

export const metadata: Metadata = {
  title: `Requisitos para Contratación | ${NOMBRE_COMERCIAL}`,
  description: `Documentación básica que necesitas para contratar el servicio de ${NOMBRE_COMERCIAL}: identificación, comprobante de domicilio, correo, ubicación y datos fiscales.`,
};

interface Requisito {
  title: string;
  description: React.ReactNode;
  icon: LucideIcon;
  items: string[];
}

/** Requisitos genéricos del giro; los plazos y montos de cada empresa quedan pendientes. */
const requisitos: Requisito[] = [
  {
    title: "Tu Identificación",
    description:
      "Para validar tu identidad, necesitaremos una identificación oficial vigente. Puedes usar cualquiera de las siguientes opciones:",
    icon: FileText,
    items: [
      "Credencial para Votar (INE/IFE)",
      "Pasaporte vigente mexicano",
      "Cédula Profesional",
      "Pasaporte extranjero vigente",
      "Documento migratorio (FM2/FM3)",
      "Licencia de conducir o Cartilla del Servicio Militar Nacional",
    ],
  },
  {
    title: "Email de Contacto",
    description:
      "Asegúrate de tener un correo electrónico al que accedas con frecuencia. Será el canal principal para gestionar tu cuenta, recibir facturas y estar al tanto de las novedades de tu servicio.",
    icon: Mail,
    items: [],
  },
  {
    title: "Ubicación de Instalación",
    description:
      "Para que el servicio llegue hasta tu hogar, requerimos la ubicación exacta de tu domicilio. Así aseguramos que la instalación técnica sea correcta desde el primer día.",
    icon: MapPin,
    items: [],
  },
  {
    title: "Comprobante de Domicilio",
    description: (
      <>
        Necesitaremos verificar tu dirección con un comprobante reciente (antigüedad máxima: <Pendiente />). Las
        opciones válidas incluyen:
      </>
    ),
    icon: Home,
    items: ["Recibo del servicio eléctrico (CFE)", "Boleta predial", "Estado de cuenta telefónico"],
  },
  {
    title: "Datos Fiscales (Opcional)",
    description:
      "Si requieres factura, por favor comparte tu Constancia de Situación Fiscal actualizada. Es opcional, pero indispensable para emitir facturas con validez fiscal.",
    icon: Building2,
    items: [],
  },
  {
    title: "Pago de Contratación",
    description: (
      <>
        Una vez que validemos tus documentos, el último paso es realizar el pago de contratación. Con esto confirmado,
        fijaremos la fecha para la instalación de tu servicio. Costo de contratación:{" "}
        <Dato valor={COSTO_INSTALACION} className="font-semibold text-foreground" />.
      </>
    ),
    icon: CreditCard,
    items: [],
  },
];

export default function RequisitosContratacionPage() {
  const telHref = telefonoHref();

  return (
    <div className="pb-16">
      <PageHero
        titulo="Requisitos para"
        resaltado="Contratación"
        descripcion={`Para contratar el servicio de ${NOMBRE_COMERCIAL} solo necesitas tener lista esta documentación básica; nuestro equipo formalizará tu contrato y programará tu instalación.`}
      />

      {/* Requisitos */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {requisitos.map((req) => (
            <div
              key={req.title}
              className="rounded-2xl border border-border/50 bg-card/50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                <req.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-foreground md:text-2xl">{req.title}</h3>
              <p className="mb-4 leading-relaxed text-muted-foreground">{req.description}</p>
              {req.items.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {req.items.map((item) => (
                    <li key={item} className="flex items-start text-sm text-muted-foreground">
                      <span className="mr-2 text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Zonas con cobertura */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-border/50 bg-card/50 p-6 sm:p-8 md:p-12">
          <div className="mb-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-foreground md:text-3xl">
              Zonas con <span className="gradient-text">Cobertura</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Estas son las localidades donde brindamos servicio. Si tu zona no aparece, contáctanos para verificar
              disponibilidad.
            </p>
          </div>
          {ZONAS_COBERTURA.length > 0 ? (
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ZONAS_COBERTURA.map((zona) => (
                <div
                  key={zona.nombre}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/50"
                >
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <div className="min-w-0">
                    <span className="block break-words text-sm font-medium text-foreground">{zona.nombre}</span>
                    {zona.tecnologia && (
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
                        {zona.tecnologia}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <BloquePendiente
              titulo="Localidades con cobertura pendientes"
              descripcion="Se publicarán las localidades donde se presta el servicio."
              className="mx-auto max-w-4xl"
            />
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-card to-muted p-6 text-center shadow-xl sm:p-8 md:p-12">
          <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">¿Todo listo para comenzar?</h3>
          <p className="mb-8 text-lg text-muted-foreground">
            Uno de nuestros asesores te acompañará en cada paso del proceso de contratación.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href={RUTAS.quieroContratar}>Quiero contratar</Link>
            </Button>
            {telHref ? (
              <Button asChild size="lg" variant="outline">
                <a href={telHref}>Contactar por teléfono</a>
              </Button>
            ) : (
              <Button asChild size="lg" variant="outline">
                <Link href="/#contacto">Enviar mensaje</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <DocumentoOficialVisor clave="procedimientoContratacion" />
    </div>
  );
}
