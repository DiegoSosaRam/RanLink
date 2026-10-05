import { DOCUMENTOS, type ClaveDocumento } from "@/lib/constants";
import { PdfViewer } from "./PdfViewer";
import { BloquePendiente } from "./BloquePendiente";

/**
 * Muestra un documento oficial registrado en DOCUMENTOS (constants.ts).
 * Si el PDF todavía no se publica, muestra el espacio reservado en lugar de
 * un visor que apunte a un archivo inexistente.
 */
export function DocumentoOficialVisor({ clave }: { clave: ClaveDocumento }) {
  const doc = DOCUMENTOS[clave];
  const archivo: string | null = doc.archivo;

  if (archivo) {
    return <PdfViewer src={archivo} title={doc.titulo} description={doc.descripcion} />;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <BloquePendiente
        titulo={`${doc.titulo}: documento pendiente de publicación`}
        descripcion="El documento oficial se publicará en esta sección en cuanto esté disponible."
        className="min-h-[280px]"
      />
    </section>
  );
}
