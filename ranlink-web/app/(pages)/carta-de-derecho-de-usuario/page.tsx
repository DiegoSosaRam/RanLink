import type { Metadata } from "next";
import { Gavel, CheckCircle2, Info, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BloquePendiente } from "@/components/BloquePendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Carta de Derechos del Usuario | ${NOMBRE_COMERCIAL}`,
  description: `Consulta la carta de derechos esenciales de las personas usuarias de servicios de telecomunicaciones de ${NOMBRE_COMERCIAL}.`,
};

// Títulos genéricos: el detalle de cada derecho se publica con el documento oficial.
const secciones = [
  {
    id: "libertad",
    titulo: "1. Libertad de decisión",
    icono: CheckCircle2,
    subtemas: [] as string[],
  },
  {
    id: "informacion",
    titulo: "2. Derecho a información clara",
    icono: Info,
    subtemas: [] as string[],
  },
  {
    id: "contratacion",
    titulo: "3. Contratación con condiciones justas",
    icono: FileText,
    subtemas: ["Cambios al contrato", "Contrato registrado ante PROFECO e inscrito ante la CRT"],
  },
];

export default function CartaDerechosPage() {
  return (
    <>
      <PageHero
        icon={Gavel}
        titulo="Carta de"
        resaltado="Derechos Esenciales"
        descripcion={`En esta página encontrarás la carta de derechos esenciales para personas usuarias de los servicios de ${NOMBRE_COMERCIAL}.`}
      />

      <div className="mx-auto max-w-5xl space-y-16 px-4 py-12 sm:px-6">
        {secciones.map((s) => (
          <section key={s.id}>
            <div className="mb-8 flex items-center gap-4 sm:gap-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border/50 bg-card text-secondary shadow-md">
                <s.icono className="h-7 w-7" />
              </div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">{s.titulo}</h2>
            </div>

            <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." />

            {s.subtemas.map((sub) => (
              <div key={sub} className="mt-10 space-y-6">
                <h3 className="border-l-4 border-secondary/50 pl-4 text-lg font-bold text-secondary sm:text-xl">{sub}</h3>
                <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." />
              </div>
            ))}
          </section>
        ))}

        <SolicitarDocumentoLegal
          titulo="Documento completo para consulta"
          descripcion="Si necesitas la versión completa de la carta de derechos, escríbenos y te la hacemos llegar por correo electrónico."
          asunto="Solicitud de la Carta de Derechos Mínimos"
          etiquetaBoton="Solicitar documento"
        />
      </div>

      <DocumentoOficialVisor clave="cartaDerechos" />
    </>
  );
}
