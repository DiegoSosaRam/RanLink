import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/PageHero";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { Dato } from "@/components/Pendiente";
import {
  Award,
  Router,
  ClipboardList,
  Gauge,
  Eye,
  Scale,
  ExternalLink,
  FileSignature,
  MessageSquareWarning,
  Wallet,
  Map,
} from "lucide-react";
import {
  NOMBRE_COMERCIAL,
  TITULAR,
  AUTORIZACION_FOLIO,
  AUTORIZACION_INSCRIPCION,
  AUTORIZACION_FECHA,
  AUTORIZACION_VIGENCIA,
  VISOR_TARIFAS_URL,
  LINEAMIENTOS_CALIDAD_URL,
  LINEAMIENTOS_TRANSPARENCIA_URL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Información Regulatoria | ${NOMBRE_COMERCIAL}`,
  description: `Título de autorización, tarifas, equipos terminales, catálogo de trámites, procedimientos, medios de pago, mapas de cobertura y lineamientos de calidad y transparencia de ${NOMBRE_COMERCIAL}.`,
};

/** Secciones con índice, para navegar la página desde arriba. */
const INDICE = [
  { id: "autorizacion", label: "Título de Autorización", icon: Award },
  { id: "tarifas", label: "Tarifas y Visor Oficial", icon: Scale },
  { id: "equipos", label: "Equipos Terminales", icon: Router },
  { id: "tramites", label: "Catálogo de Trámites", icon: ClipboardList },
  { id: "contratacion", label: "Procedimiento de Contratación", icon: FileSignature },
  { id: "quejas", label: "Procedimiento de Quejas", icon: MessageSquareWarning },
  { id: "medios-pago", label: "Medios de Pago", icon: Wallet },
  { id: "cobertura", label: "Mapas de Cobertura", icon: Map },
  { id: "calidad", label: "Lineamientos de Calidad", icon: Gauge },
  { id: "transparencia", label: "Lineamientos de Transparencia", icon: Eye },
];

/** Datos de la constancia de inscripción de la autorización. */
const DATOS_AUTORIZACION = [
  { etiqueta: "Folio electrónico", valor: AUTORIZACION_FOLIO },
  { etiqueta: "Número de inscripción", valor: AUTORIZACION_INSCRIPCION },
  { etiqueta: "Fecha de inscripción", valor: AUTORIZACION_FECHA },
  { etiqueta: "Vigencia", valor: AUTORIZACION_VIGENCIA },
];

export default function InformacionRegulatoriaPage() {
  return (
    <div className="pb-20">
      <PageHero
        icon={Scale}
        etiqueta="Transparencia"
        titulo="Información"
        resaltado="Regulatoria"
        descripcion={`Aquí reunimos la documentación oficial de ${NOMBRE_COMERCIAL} ante la Comisión Reguladora de Telecomunicaciones (CRT) y la Procuraduría Federal del Consumidor (PROFECO). Los documentos se publicarán para su consulta conforme estén disponibles.`}
      />

      {/* Índice */}
      <section className="mx-auto mb-16 max-w-5xl px-4 pt-4 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INDICE.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex items-center gap-3 rounded-2xl border border-border/50 bg-card/40 p-4 transition-colors hover:border-secondary/50 hover:bg-card"
            >
              <s.icon className="h-5 w-5 shrink-0 text-secondary" />
              <span className="text-sm font-medium text-foreground">{s.label}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Título de autorización */}
      <section id="autorizacion" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Título de Autorización</h2>
          <p className="mb-6 text-muted-foreground">
            Titular de la autorización: <Dato valor={TITULAR} className="font-semibold text-foreground" />. Constancia de
            inscripción en el Registro Público de Concesiones de la CRT.
          </p>
          <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DATOS_AUTORIZACION.map((d) => (
              <Card key={d.etiqueta} className="border-border/30 bg-muted/10">
                <CardContent className="p-5">
                  <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{d.etiqueta}</p>
                  <p className="break-all font-mono text-sm font-bold text-secondary">
                    <Dato valor={d.valor} />
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <DocumentoOficialVisor clave="autorizacion" />
      </section>

      {/* Tarifas */}
      <section id="tarifas" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Tarifas y Visor Oficial</h2>
          <p className="mb-6 text-muted-foreground">
            Puedes consultar y comparar las tarifas de los proveedores de telecomunicaciones del país en el visor oficial
            de la CRT. Los folios de inscripción de las tarifas de {NOMBRE_COMERCIAL} se publicarán aquí.
          </p>
          <Button asChild variant="gold" className="gap-2">
            <a href={VISOR_TARIFAS_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Abrir el visor de tarifas
            </a>
          </Button>
        </div>
        <DocumentoOficialVisor clave="foliosTarifas" />
      </section>

      {/* Equipos terminales */}
      <section id="equipos" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Equipos Terminales</h2>
          <p className="mb-6 text-muted-foreground">
            Ficha técnica con las características y especificaciones del equipo que se instala en el domicilio de la
            persona usuaria.
          </p>
        </div>
        <DocumentoOficialVisor clave="equiposTerminales" />
      </section>

      {/* Catálogo de trámites */}
      <section id="tramites" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Catálogo de Trámites</h2>
          <p className="mb-6 text-muted-foreground">
            Requisitos, medios, costos y tiempos de cada trámite disponible para las personas usuarias.
          </p>
        </div>
        <DocumentoOficialVisor clave="catalogoTramites" />
      </section>

      {/* Procedimiento de contratación */}
      <section id="contratacion" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Procedimiento de Contratación</h2>
          <p className="mb-6 text-muted-foreground">
            Documento con los requisitos y el paso a paso para contratar el servicio.
          </p>
        </div>
        <DocumentoOficialVisor clave="procedimientoContratacion" />
      </section>

      {/* Procedimiento de quejas */}
      <section id="quejas" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Procedimiento de Quejas</h2>
          <p className="mb-6 text-muted-foreground">
            Documento que explica cómo presentar una queja y los plazos de atención.
          </p>
        </div>
        <DocumentoOficialVisor clave="procedimientoQuejas" />
      </section>

      {/* Medios de pago */}
      <section id="medios-pago" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Medios de Pago</h2>
          <p className="mb-6 text-muted-foreground">Formas aceptadas para pagar el servicio.</p>
        </div>
        <DocumentoOficialVisor clave="mediosPago" />
      </section>

      {/* Mapas de cobertura */}
      <section id="cobertura" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Mapas de Cobertura</h2>
          <p className="mb-6 text-muted-foreground">Zonas donde se presta el servicio.</p>
        </div>
        <DocumentoOficialVisor clave="mapasCobertura" />
      </section>

      {/* Lineamientos de calidad */}
      <section id="calidad" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Lineamientos de Calidad</h2>
          <p className="mb-6 text-muted-foreground">
            Índices y parámetros de calidad a los que se sujetan los prestadores del servicio fijo, publicados en el
            Diario Oficial de la Federación el 25 de febrero de 2020.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <a href={LINEAMIENTOS_CALIDAD_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Consultar en el DOF
            </a>
          </Button>
        </div>
      </section>

      {/* Lineamientos de transparencia */}
      <section id="transparencia" className="scroll-mt-28">
        <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Lineamientos de Transparencia</h2>
          <p className="mb-6 text-muted-foreground">
            Lineamientos generales para la publicación de información transparente, comparable, adecuada y actualizada
            de los servicios de telecomunicaciones, publicados en el Diario Oficial de la Federación el 12 de febrero de
            2020.
          </p>
          <Button asChild variant="outline" className="gap-2">
            <a href={LINEAMIENTOS_TRANSPARENCIA_URL} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Consultar en el DOF
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
