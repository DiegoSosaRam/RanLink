import Link from "next/link";
import { CreditCard, FileCheck, FileText, Home, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "../SectionHeader";
import { NOMBRE_COMERCIAL } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

// Requisitos generales del giro. Plazos y montos específicos están pendientes
// de confirmar con la empresa, por eso no se mencionan aquí.
const REQUISITOS = [
  {
    icon: FileText,
    titulo: "Identificación oficial",
    descripcion: "Ten a la mano alguna identificación oficial vigente.",
    detalles: ["INE", "Pasaporte", "Licencia de manejo"],
  },
  {
    icon: Mail,
    titulo: "Correo electrónico",
    descripcion: "Proporciona un correo para recibir la información de tu contratación.",
    detalles: [],
  },
  {
    icon: MapPin,
    titulo: "Ubicación",
    descripcion: "Un asesor te pedirá la ubicación de tu domicilio para validar la cobertura.",
    detalles: [],
  },
  {
    icon: Home,
    titulo: "Comprobante de domicilio",
    descripcion: "Presenta un comprobante de domicilio reciente.",
    detalles: ["Recibo de luz", "Predial", "Recibo telefónico"],
  },
  {
    icon: FileCheck,
    titulo: "Constancia de situación fiscal",
    descripcion: "Solo si requieres factura: envía a tu asesor tu constancia de situación fiscal actualizada.",
    detalles: [],
  },
  {
    icon: CreditCard,
    titulo: "Pago de contratación",
    descripcion: "Después de entregar tus documentos, realiza el pago de contratación para agendar tu instalación.",
    detalles: [],
  },
];

export function RequirementsSection() {
  return (
    <section id="requisitos" className="scroll-mt-24 bg-card py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          title="Requisitos para"
          highlightedText="contratar"
          description={`Ten a la mano esta documentación para que un asesor de ${NOMBRE_COMERCIAL} realice tu contrato y agende tu instalación.`}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REQUISITOS.map((req) => (
            <div key={req.titulo} className="card-glow group rounded-2xl border border-border bg-background/80 p-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 transition-transform duration-300 group-hover:scale-110">
                <req.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="gradient-text mb-3 text-xl font-bold">{req.titulo}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{req.descripcion}</p>
              {req.detalles.length > 0 && (
                <ul className="space-y-1">
                  {req.detalles.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href={RUTAS.requisitos}>Ver requisitos completos</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
