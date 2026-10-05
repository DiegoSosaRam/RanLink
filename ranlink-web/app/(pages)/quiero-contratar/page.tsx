import type { Metadata } from "next";
import { FileSignature } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Dato } from "@/components/Pendiente";
import { FormularioContratacion } from "@/components/FormularioContratacion";
import { CORREO_CONTACTO, DOMICILIO, NOMBRE_COMERCIAL, TELEFONO } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Quiero contratar | ${NOMBRE_COMERCIAL}`,
  description: `Solicita la contratación del servicio de internet de ${NOMBRE_COMERCIAL}: déjanos tus datos y te contactaremos.`,
};

export default function QuieroContratarPage() {
  return (
    <>
      <PageHero
        icon={FileSignature}
        titulo="Solicitud de"
        resaltado="Contratación"
        descripcion={`Déjanos tus datos y el equipo de ${NOMBRE_COMERCIAL} se pondrá en contacto contigo.`}
      />

      <section className="relative px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-md sm:p-8 md:p-12">
            <FormularioContratacion />
          </div>

          <div className="mt-12 space-y-3 text-center">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Contáctanos</h2>
            <div className="space-y-2 break-words text-sm text-muted-foreground">
              <p><Dato valor={DOMICILIO} /></p>
              <p><Dato valor={TELEFONO} /></p>
              <p className="break-all"><Dato valor={CORREO_CONTACTO} /></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
