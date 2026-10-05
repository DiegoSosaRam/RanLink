import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato } from "@/components/Pendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import {
  CORREO_CONTACTO,
  COSTO_INSTALACION,
  DOMICILIO_CORTO,
  NOMBRE_COMERCIAL,
  PLANES,
  TELEFONO,
  VISOR_TARIFAS_URL,
  correoHref,
  esPendiente,
  telefonoHref,
} from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

export const metadata: Metadata = {
  title: `Términos y Condiciones | ${NOMBRE_COMERCIAL}`,
  description: `Consulta los términos y condiciones de los servicios de ${NOMBRE_COMERCIAL}.`,
};

const RESUMEN_PENDIENTE = "Se publicará junto con el documento oficial.";

export default function TerminosCondicionesPage() {
  const correo = correoHref(CORREO_CONTACTO);
  const telefono = telefonoHref();

  return (
    <>
      <PageHero
        titulo="Términos y"
        resaltado="Condiciones"
        descripcion={`Documento informativo sobre las condiciones de uso, contratación y cancelación de los servicios de ${NOMBRE_COMERCIAL}.`}
      />

      <div className="mx-auto max-w-5xl space-y-12 px-4 py-12 sm:px-6">
        {/* Cobertura */}
        <Card className="overflow-hidden border-primary/10 bg-card/50">
          <CardHeader className="border-b border-primary/10 bg-primary/5 px-6 py-4 sm:px-8">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <MapPin className="h-5 w-5 text-secondary" />
              Cobertura
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 sm:p-8">
            <BloquePendiente titulo="Resumen pendiente" descripcion={RESUMEN_PENDIENTE} />
          </CardContent>
        </Card>

        {/* Requisitos de contratación y costo de contratación */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-secondary" />
              Requisitos de contratación
            </h2>
            <BloquePendiente titulo="Resumen pendiente" descripcion={RESUMEN_PENDIENTE}>
              <Button asChild variant="outline" size="sm" className="mt-2">
                <Link href={RUTAS.requisitos}>Ver requisitos de contratación</Link>
              </Button>
            </BloquePendiente>
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-primary/10 bg-primary/5 p-6 sm:p-8">
            <AlertCircle className="mb-6 h-12 w-12 text-secondary" />
            <h3 className="mb-4 text-xl font-bold">Aviso importante</h3>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-secondary/20 bg-card p-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Costo de contratación</span>
              {esPendiente(COSTO_INSTALACION) ? (
                <Dato valor={COSTO_INSTALACION} />
              ) : (
                <Badge variant="secondary" className="px-4 py-1 text-lg">{COSTO_INSTALACION}</Badge>
              )}
            </div>
          </div>
        </section>

        {/* Costos de inicio de servicio */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight sm:text-3xl">Costos de inicio de servicio</h2>
          </div>
          <BloquePendiente
            titulo="Costos pendientes"
            descripcion="Los conceptos, importes y plazos de inicio de servicio se publicarán junto con el documento oficial."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {["Cancelación anticipada", "Evaluación de factibilidad técnica", "Instalación del servicio"].map((titulo) => (
              <Card key={titulo} className="border-border/30 bg-muted/10">
                <CardContent className="p-6 pt-6">
                  <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">{titulo}</p>
                  <BloquePendiente titulo="Pendiente" className="p-5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Costo y descripción de los planes */}
        <section className="space-y-8 pt-6">
          <h2 className="text-center text-xl font-bold uppercase tracking-widest sm:text-2xl">Costo y descripción de los planes</h2>
          {PLANES.length > 0 ? (
            <div className="overflow-hidden overflow-x-auto rounded-2xl border border-border/50 shadow-2xl">
              <Table className="min-w-[640px]">
                <TableHeader className="bg-secondary/10">
                  <TableRow>
                    <TableHead className="font-bold text-foreground">Plan {NOMBRE_COMERCIAL}</TableHead>
                    <TableHead className="font-bold text-foreground">Registro CRT</TableHead>
                    <TableHead className="font-bold text-foreground">Mensualidad (IVA incluido)</TableHead>
                    <TableHead className="text-center font-bold text-foreground">Velocidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PLANES.map((p) => (
                    <TableRow key={p.nombre} className="transition-colors hover:bg-primary/5">
                      <TableCell className="py-6 font-bold">{p.nombre}</TableCell>
                      <TableCell className="text-xs text-muted-foreground"><Dato valor={p.folioTarifa} /></TableCell>
                      <TableCell className="font-bold text-secondary"><Dato valor={p.precio} /></TableCell>
                      <TableCell className="text-center text-lg font-bold">{p.velocidad}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <BloquePendiente
              titulo="Planes pendientes de publicación"
              descripcion="Los planes, precios y folios de registro se publicarán cuando estén inscritos ante la CRT."
            />
          )}
          <p className="text-center text-xs text-muted-foreground">
            Puedes consultar y comparar tarifas en el{" "}
            <a href={VISOR_TARIFAS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-secondary underline underline-offset-4">
              visor oficial de tarifas
            </a>
            .
          </p>
        </section>

        {/* Contenido legal */}
        <section className="space-y-12 py-6">
          {["Portabilidad numérica", "Terminación y cancelación"].map((titulo) => (
            <div key={titulo}>
              <h3 className="mb-6 text-xl font-bold uppercase tracking-wider text-secondary">{titulo}</h3>
              <BloquePendiente titulo="Resumen pendiente" descripcion={RESUMEN_PENDIENTE} />
            </div>
          ))}
        </section>

        <SolicitarDocumentoLegal
          titulo="¿Deseas información más detallada?"
          descripcion="Solicita los términos y condiciones completos y te los enviamos por correo para que los consultes en cualquier momento."
          asunto="Solicitud de los Términos y Condiciones"
          etiquetaBoton="Solicitar términos y condiciones"
        />

        {/* Atención a clientes */}
        <section className="border-t border-border/50 pt-16 text-center">
          <h3 className="mb-10 text-lg font-bold uppercase tracking-widest text-muted-foreground">Atención a clientes</h3>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Phone className="h-6 w-6" />
              </div>
              {telefono ? (
                <a href={telefono} className="font-bold hover:text-primary">{TELEFONO}</a>
              ) : (
                <Dato valor={TELEFONO} />
              )}
              <span className="text-xs text-muted-foreground">Llámanos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Mail className="h-6 w-6" />
              </div>
              {correo ? (
                <a href={correo} className="break-all font-bold hover:text-primary">{CORREO_CONTACTO}</a>
              ) : (
                <Dato valor={CORREO_CONTACTO} />
              )}
              <span className="text-xs text-muted-foreground">Escríbenos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <MapPin className="h-6 w-6" />
              </div>
              <Dato valor={DOMICILIO_CORTO} className="break-words text-sm font-bold" />
              <span className="text-xs text-muted-foreground">Dónde estamos</span>
            </div>
          </div>
        </section>
      </div>

      <DocumentoOficialVisor clave="terminosCondiciones" />
    </>
  );
}
