import type { Metadata } from "next";
import { Shield, Lock, Scale, UserCheck, Eye, RefreshCcw, Mail, Phone, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato } from "@/components/Pendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import { CORREO_CONTACTO, DOMICILIO, NOMBRE_COMERCIAL, TELEFONO } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Aviso de Privacidad | ${NOMBRE_COMERCIAL}`,
  description: `Consulta el aviso de privacidad de ${NOMBRE_COMERCIAL} y los canales para ejercer tus derechos sobre tus datos personales.`,
};

// Títulos genéricos: el contenido de cada sección se publica con el documento oficial.
const secciones = [
  { titulo: "1. ¿Qué información se recaba?", icono: UserCheck },
  { titulo: "2. Seguridad y confidencialidad", icono: Lock },
  { titulo: "3. Colaboración con autoridades", icono: Scale },
  { titulo: "4. Derechos ARCO", icono: Eye, contacto: true },
  { titulo: "5. Cookies", icono: Shield },
  { titulo: "6. Actualizaciones del aviso", icono: RefreshCcw },
];

export default function AvisoPrivacidadPage() {
  const canales = [
    { icono: MapPin, valor: DOMICILIO },
    { icono: Mail, valor: CORREO_CONTACTO },
    { icono: Phone, valor: TELEFONO },
  ];

  return (
    <>
      <PageHero
        icon={Shield}
        titulo="Aviso de"
        resaltado="Privacidad"
        descripcion={`En esta página encontrarás el aviso de privacidad de ${NOMBRE_COMERCIAL}, con la información sobre el tratamiento de tus datos personales.`}
      />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {secciones.map((s) => (
            <Card key={s.titulo} className="border-border/50 bg-card/40 transition-colors hover:border-primary/30">
              <CardContent className="p-6 pt-6 sm:p-8">
                <div className="mb-5 flex items-center gap-4">
                  <div className="shrink-0 rounded-xl bg-secondary/10 p-3 text-secondary">
                    <s.icono className="h-6 w-6" />
                  </div>
                  <h2 className="text-lg font-bold tracking-tight sm:text-xl">{s.titulo}</h2>
                </div>
                <BloquePendiente
                  titulo="Resumen pendiente"
                  descripcion="Se publicará junto con el documento oficial."
                  className="p-5"
                />
                {s.contacto && (
                  <div className="mt-6 space-y-3 border-t border-border/50 pt-6">
                    <p className="text-sm text-muted-foreground">Canales oficiales para gestiones de privacidad:</p>
                    {canales.map((c, i) => (
                      <div key={i} className="flex items-start gap-3 break-words text-sm text-secondary">
                        <c.icono className="mt-0.5 h-4 w-4 shrink-0" />
                        <Dato valor={c.valor} className="break-words" />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16">
          <SolicitarDocumentoLegal
            titulo="¿Necesitas el documento oficial?"
            descripcion="Solicita la versión completa del aviso de privacidad y te la hacemos llegar por correo para tu consulta."
            asunto="Solicitud del Aviso de Privacidad"
            etiquetaBoton="Solicitar aviso completo"
          />
        </div>
      </div>

      <DocumentoOficialVisor clave="avisoPrivacidad" />
    </>
  );
}
