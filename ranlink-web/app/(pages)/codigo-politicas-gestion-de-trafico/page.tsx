import type { Metadata } from "next";
import { Shield, Eye, Lock, Settings, LineChart, Network, AlertTriangle, HandMetal, Activity, ZapOff } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BloquePendiente } from "@/components/BloquePendiente";
import { TarjetaLegalPendiente } from "@/components/TarjetaLegalPendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Gestión de Tráfico y Neutralidad de Red | ${NOMBRE_COMERCIAL}`,
  description: `Consulta el código de políticas de gestión de tráfico y administración de red de ${NOMBRE_COMERCIAL}.`,
};

// Títulos genéricos: el contenido de cada tema se publica con el documento oficial.
const principios = [
  { titulo: "Libre elección de contenidos", icono: HandMetal },
  { titulo: "Trato equitativo del tráfico", icono: Shield },
  { titulo: "Privacidad de las comunicaciones", icono: Lock },
  { titulo: "Transparencia de la información", icono: Eye },
  { titulo: "Gestión técnica del tráfico", icono: Settings },
  { titulo: "Calidad del servicio", icono: LineChart },
  { titulo: "Capacidad e infraestructura", icono: Network },
];

export default function PoliticasTraficoPage() {
  return (
    <>
      <PageHero
        icon={Activity}
        etiqueta="Gestión de red"
        titulo="Políticas de"
        resaltado="Neutralidad y Gestión del Tráfico"
        descripcion={`En esta página encontrarás el código de políticas de gestión de tráfico y administración de red de ${NOMBRE_COMERCIAL}.`}
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-12 sm:px-6">
        <section>
          <h2 className="mb-10 text-center text-2xl font-bold uppercase tracking-tight md:text-3xl">
            Principios de neutralidad de red
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {principios.map((p) => (
              <TarjetaLegalPendiente key={p.titulo} icon={p.icono} titulo={p.titulo} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-orange-500/5 p-6 sm:p-10">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold sm:text-2xl">
              <AlertTriangle className="h-6 w-6 shrink-0 text-orange-500" />
              Medidas de protección
            </h2>
            <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." />
          </section>

          <section className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-red-500/5 p-6 sm:p-10">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold sm:text-2xl">
              <ZapOff className="h-6 w-6 shrink-0 text-red-500" />
              Usos no permitidos del servicio
            </h2>
            <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." />
          </section>
        </div>

        <SolicitarDocumentoLegal
          titulo="Navegar con claridad también es seguridad"
          descripcion="Solicita el documento completo para revisar a detalle los criterios de neutralidad y las medidas de gestión aplicables."
          asunto="Solicitud de las Políticas de Gestión de Tráfico"
          etiquetaBoton="Solicitar políticas"
        />
      </div>

      <DocumentoOficialVisor clave="codigoGestionRed" />
    </>
  );
}
