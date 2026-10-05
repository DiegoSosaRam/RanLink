import type { Metadata } from "next";
import { MessageSquare, Mail } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Dato } from "@/components/Pendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { FormularioQuejas } from "@/components/FormularioQuejas";
import { CORREO_CONTACTO, CORREO_SOPORTE, NOMBRE_COMERCIAL, correoHref, esPendiente } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Buzón de quejas o sugerencias | ${NOMBRE_COMERCIAL}`,
  description: `Envía tu queja o sugerencia a ${NOMBRE_COMERCIAL} y consulta el procedimiento de atención de quejas.`,
};

export default function BuzonQuejasPage() {
  // Misma regla que el formulario: soporte si existe, si no contacto.
  const correo = esPendiente(CORREO_SOPORTE) ? CORREO_CONTACTO : CORREO_SOPORTE;
  const enlaceCorreo = correoHref(correo);

  return (
    <>
      <PageHero
        icon={MessageSquare}
        titulo="Buzón de"
        resaltado={`Escucha ${NOMBRE_COMERCIAL}`}
        descripcion={`En ${NOMBRE_COMERCIAL} queremos conocer tu opinión. Cuéntanos tu queja o sugerencia para dar seguimiento.`}
      />

      <section className="relative px-4 pb-12 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-xl sm:p-8 md:p-12">
            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/40 p-4">
                <MessageSquare className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-medium">Quejas y sugerencias</span>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-muted/40 p-4">
                <Mail className="h-5 w-5 shrink-0 text-secondary" />
                <span className="text-sm font-medium">Seguimiento por el medio que indiques</span>
              </div>
            </div>

            <FormularioQuejas />
          </div>

          <p className="mt-10 break-words text-center text-sm text-muted-foreground">
            Si prefieres un canal más tradicional, escríbenos a{" "}
            {enlaceCorreo ? (
              <a href={enlaceCorreo} className="break-all text-secondary hover:underline">
                {correo}
              </a>
            ) : (
              <Dato valor={correo} />
            )}
          </p>
        </div>
      </section>

      <DocumentoOficialVisor clave="procedimientoQuejas" />
    </>
  );
}
