import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Wifi,
  Gavel,
  ClipboardCheck,
  CreditCard,
  Wrench,
  Headset,
  MapPin,
  XCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { TarjetaLegalPendiente } from "@/components/TarjetaLegalPendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import { NOMBRE_COMERCIAL, VISOR_TARIFAS_URL } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

export const metadata: Metadata = {
  title: `Código de Prácticas Comerciales | ${NOMBRE_COMERCIAL}`,
  description: `Consulta el código de prácticas comerciales de ${NOMBRE_COMERCIAL}.`,
};

// Documentos relacionados: solo se enlazan páginas que existen en el sitio.
const documentos = [
  { label: "Título de autorización", desc: "Constancia de inscripción ante la CRT.", href: RUTAS.informacionRegulatoria },
  { label: "Contrato de adhesión", desc: "Modelo de contrato registrado ante PROFECO.", href: RUTAS.contratoAdhesion },
  { label: "Tarifas oficiales", desc: "Consulta de tarifas en el visor oficial de la CRT.", href: VISOR_TARIFAS_URL, externo: true },
  { label: "Aviso de privacidad", desc: "Tratamiento de tus datos personales.", href: RUTAS.avisoPrivacidad },
];

// Títulos genéricos: el contenido de cada sección se publica con el documento oficial.
const secciones = [
  { titulo: "2. Conectividad", icono: Wifi },
  { titulo: "3. Respaldo legal", icono: Gavel },
  { titulo: "4. Contrato", icono: ClipboardCheck },
  { titulo: "5. Pagos", icono: CreditCard },
  { titulo: "6. Soporte técnico", icono: Wrench },
  { titulo: "7. Atención a clientes", icono: Headset },
  { titulo: "8. Canales de contacto", icono: MapPin },
  { titulo: "9. Terminación del servicio", icono: XCircle },
  { titulo: "10. Privacidad de los datos", icono: ShieldCheck },
];

export default function CodigoPracticasComercialesPage() {
  return (
    <>
      <PageHero
        icon={CheckCircle2}
        etiqueta={`Calidad ${NOMBRE_COMERCIAL}`}
        titulo="Código de"
        resaltado="Prácticas Comerciales"
        descripcion={`En esta página encontrarás el código de prácticas comerciales de ${NOMBRE_COMERCIAL}.`}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <Card className="border-border/50 bg-card/40 transition-colors hover:border-secondary/30">
            <CardContent className="p-6 pt-6 sm:p-8">
              <div className="mb-5 flex items-center gap-4">
                <div className="shrink-0 rounded-xl bg-secondary/10 p-3 text-secondary">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-lg font-bold tracking-tight sm:text-xl">1. Documentos relacionados</h2>
              </div>
              <ul className="space-y-3">
                {documentos.map((d) => (
                  <li key={d.label} className="rounded-xl border border-border/50 bg-muted/30 p-3 text-sm">
                    <span className="mb-1 block font-bold text-secondary">
                      {d.externo ? (
                        <a href={d.href} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                          {d.label}
                        </a>
                      ) : (
                        <Link href={d.href} className="underline-offset-4 hover:underline">
                          {d.label}
                        </Link>
                      )}
                    </span>
                    <span className="text-muted-foreground">{d.desc}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {secciones.map((s) => (
            <TarjetaLegalPendiente key={s.titulo} icon={s.icono} titulo={s.titulo} />
          ))}
        </div>

        <div className="mt-16">
          <SolicitarDocumentoLegal
            titulo="¿Quieres conocer todos los detalles?"
            descripcion={`Solicita el documento oficial con el código de prácticas comerciales de ${NOMBRE_COMERCIAL}.`}
            asunto="Solicitud del Código de Prácticas Comerciales"
            etiquetaBoton="Solicitar documento"
          />
        </div>
      </div>

      <DocumentoOficialVisor clave="codigoPracticasComerciales" />
    </>
  );
}
