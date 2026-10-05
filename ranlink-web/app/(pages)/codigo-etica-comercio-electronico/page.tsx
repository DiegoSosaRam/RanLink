import type { Metadata } from "next";
import { ShieldCheck, Search, Handshake, CreditCard, Megaphone, Lock, Users, Scale, Gavel } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TarjetaLegalPendiente } from "@/components/TarjetaLegalPendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Código de Ética de Comercio Electrónico | ${NOMBRE_COMERCIAL}`,
  description: `Consulta el código de ética en materia de comercio electrónico de ${NOMBRE_COMERCIAL}.`,
};

// Títulos genéricos: el contenido de cada sección se publica con el documento oficial.
const secciones = [
  { titulo: "1. Seguridad en las transacciones", icono: ShieldCheck },
  { titulo: "2. Claridad en los términos", icono: Search },
  { titulo: "3. Colaboración y transparencia", icono: Handshake },
  { titulo: "4. Pagos y entrega del servicio", icono: CreditCard },
  { titulo: "5. Publicidad", icono: Megaphone },
  { titulo: "6. Privacidad", icono: Lock },
  { titulo: "7. Inclusión y no discriminación", icono: Users },
  { titulo: "8. Resolución de controversias", icono: Gavel },
];

export default function CodigoEticaComercioPage() {
  return (
    <>
      <PageHero
        icon={Scale}
        etiqueta="Ética digital"
        titulo="Código de Ética en materia de"
        resaltado="Comercio Electrónico"
        descripcion={`En esta página encontrarás el código de ética de ${NOMBRE_COMERCIAL} en materia de comercio electrónico.`}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {secciones.map((s) => (
            <TarjetaLegalPendiente key={s.titulo} icon={s.icono} titulo={s.titulo} />
          ))}
        </div>

        <div className="mt-16">
          <SolicitarDocumentoLegal
            titulo="¿Necesitas profundizar? Solicita el código completo"
            descripcion="Escríbenos y te enviamos la versión oficial para tu consulta detallada."
            asunto="Solicitud del Código de Ética en Comercio Electrónico"
            etiquetaBoton="Solicitar código"
          />
        </div>
      </div>

      <DocumentoOficialVisor clave="codigoEticaComercioElectronico" />
    </>
  );
}
