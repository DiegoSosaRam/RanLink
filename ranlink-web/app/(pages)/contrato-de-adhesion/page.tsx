import type { Metadata } from "next";
import { FileCheck, Download, ShieldCheck, CheckCircle2, Info, ExternalLink, Scale } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato } from "@/components/Pendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import {
  CONTRATO_ADHESION_URL,
  CONTRATO_OFICIO,
  CONTRATO_REGISTRO,
  CONTRATO_REGISTRO_FECHA,
  CORREO_CONTACTO,
  DOCUMENTOS,
  NOMBRE_COMERCIAL,
  TELEFONO,
  correoHref,
  telefonoHref,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contrato de Adhesión | ${NOMBRE_COMERCIAL}`,
  description: `Consulta el contrato de adhesión de ${NOMBRE_COMERCIAL} y verifica su registro ante PROFECO.`,
};

// Títulos genéricos: el resumen de cada punto se publica con el contrato oficial.
const destacados = [
  { titulo: "Respaldo legal", icono: ShieldCheck },
  { titulo: "Claridad del contrato", icono: FileCheck },
  { titulo: "Seguridad jurídica", icono: CheckCircle2 },
];

export default function ContratoAdhesionPage() {
  // El PDF se publica con DOCUMENTOS.contratoAdhesion.archivo; sin él no hay descarga.
  const archivo: string | null = DOCUMENTOS.contratoAdhesion.archivo;
  const correo = correoHref(CORREO_CONTACTO);
  const telefono = telefonoHref();

  const datosRegistrales = [
    { etiqueta: "Número de registro", valor: CONTRATO_REGISTRO, clase: "font-mono text-lg" },
    { etiqueta: "Fecha de registro", valor: CONTRATO_REGISTRO_FECHA, clase: "text-lg" },
    { etiqueta: "Oficio PROFECO", valor: CONTRATO_OFICIO, clase: "font-mono text-sm break-all" },
  ];

  return (
    <>
      <PageHero
        icon={Scale}
        etiqueta="Compromiso de transparencia"
        titulo="Contrato de"
        resaltado="Adhesión"
        descripcion={`En esta página encontrarás el contrato de adhesión de ${NOMBRE_COMERCIAL} y los datos de su registro ante PROFECO.`}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Puntos destacados */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {destacados.map((h) => (
            <div key={h.titulo} className="flex flex-col items-center rounded-3xl border border-border/50 bg-card/40 p-6 text-center transition-colors hover:border-primary/20 sm:p-8">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <h.icono className="h-8 w-8" />
              </div>
              <h2 className="mb-4 text-xl font-bold">{h.titulo}</h2>
              <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." className="w-full p-5" />
            </div>
          ))}
        </div>

        {/* Datos registrales */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {datosRegistrales.map((d) => (
            <Card key={d.etiqueta} className="border-border/50 bg-card/40">
              <CardContent className="p-6 pt-6">
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{d.etiqueta}</p>
                <p className="font-bold text-secondary">
                  <Dato valor={d.valor} className={d.clase} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Documento y verificación */}
        <Card className="relative overflow-hidden rounded-3xl border-border bg-card/60">
          <CardContent className="p-6 pt-6 text-center sm:p-10 md:p-16">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                <Info className="h-4 w-4" />
                Documento oficial PDF
              </div>

              <h2 className="mb-6 text-2xl font-black leading-tight sm:text-3xl md:text-4xl">Revisa el contrato antes de contratar</h2>

              <p className="mb-10 text-lg text-muted-foreground">
                Conocer las condiciones del servicio es el primer paso antes de formalizar tu contratación con {NOMBRE_COMERCIAL}.
              </p>

              {archivo ? (
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Button asChild size="lg" className="h-auto whitespace-normal rounded-2xl px-8 py-4">
                    <a href={archivo} download>
                      <Download className="h-5 w-5" />
                      Descargar contrato
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-auto whitespace-normal rounded-2xl px-8 py-4">
                    <a href={archivo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5" />
                      Ver en línea
                    </a>
                  </Button>
                </div>
              ) : (
                <BloquePendiente
                  titulo="Contrato pendiente de publicación"
                  descripcion="El documento se podrá descargar aquí en cuanto esté disponible."
                />
              )}

              <p className="mt-10 text-sm text-muted-foreground">
                También puedes verificar el contrato directamente en el{" "}
                <a
                  href={CONTRATO_ADHESION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-secondary underline underline-offset-4"
                >
                  Buró Comercial de PROFECO
                </a>
                .
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="rounded-3xl border-border/50 bg-card/40">
            <CardContent className="p-6 pt-6 sm:p-8">
              <h3 className="mb-4 flex items-center gap-3 text-lg font-bold">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-secondary" />
                ¿Qué vas a encontrar aquí?
              </h3>
              <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." className="p-5" />
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-border/50 bg-card/40">
            <CardContent className="p-6 pt-6 sm:p-8">
              <h3 className="mb-4 flex items-center gap-3 text-lg font-bold">
                <Scale className="h-5 w-5 shrink-0 text-primary" />
                ¿Tienes alguna duda técnica o legal?
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Si algo no te queda claro, contáctanos y te ayudaremos a resolverlo.
              </p>
              <div className="mt-5 space-y-1 break-all text-sm font-bold text-primary">
                {correo ? (
                  <a href={correo} className="block underline-offset-4 hover:underline">{CORREO_CONTACTO}</a>
                ) : (
                  <Dato valor={CORREO_CONTACTO} />
                )}
                <div>
                  {telefono ? (
                    <a href={telefono} className="underline-offset-4 hover:underline">{TELEFONO}</a>
                  ) : (
                    <Dato valor={TELEFONO} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <DocumentoOficialVisor clave="contratoAdhesion" />
    </>
  );
}
