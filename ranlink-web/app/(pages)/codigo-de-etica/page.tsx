import type { Metadata } from "next";
import { Scale } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { BloquePendiente } from "@/components/BloquePendiente";
import { Dato } from "@/components/Pendiente";
import { DocumentoOficialVisor } from "@/components/DocumentoOficialVisor";
import { SolicitarDocumentoLegal } from "@/components/SolicitarDocumentoLegal";
import { CORREO_CONTACTO, NOMBRE_COMERCIAL, SITIO_URL, TELEFONO, correoHref, esPendiente, telefonoHref } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Código de Ética | ${NOMBRE_COMERCIAL}`,
  description: `Consulta el código de ética de ${NOMBRE_COMERCIAL}.`,
};

// Títulos genéricos: el contenido se publica con el documento oficial.
const valores = ["Neutralidad de la red", "Información clara y transparente", "Publicidad y protección de datos"];

export default function CodigoDeEticaPage() {
  const correo = correoHref(CORREO_CONTACTO);
  const telefono = telefonoHref();
  const sitioDisponible = !esPendiente(SITIO_URL);

  // Los datos pendientes se muestran con el marcador; los reales, con su enlace.
  const contactos = [
    {
      etiqueta: "Correo electrónico",
      contenido: correo ? (
        <a href={correo} className="break-all text-muted-foreground transition-colors hover:text-primary">{CORREO_CONTACTO}</a>
      ) : (
        <Dato valor={CORREO_CONTACTO} />
      ),
    },
    {
      etiqueta: "Teléfono",
      contenido: telefono ? (
        <a href={telefono} className="text-muted-foreground transition-colors hover:text-primary">{TELEFONO}</a>
      ) : (
        <Dato valor={TELEFONO} />
      ),
    },
    {
      etiqueta: "Página web",
      contenido: sitioDisponible ? (
        <a href="/" className="break-all text-muted-foreground transition-colors hover:text-primary">{SITIO_URL}</a>
      ) : (
        <Dato valor={SITIO_URL} />
      ),
    },
  ];

  return (
    <>
      <PageHero
        icon={Scale}
        titulo="Código de"
        resaltado={`Ética ${NOMBRE_COMERCIAL}`}
        descripcion={`En esta página encontrarás el código de ética de ${NOMBRE_COMERCIAL}.`}
      />

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12 sm:px-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">Nuestro compromiso</h2>
          <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">Valores y principios</h2>
          <ul className="space-y-6">
            {valores.map((titulo) => (
              <li key={titulo} className="rounded-xl border border-border/50 bg-card/50 p-6 transition-colors hover:border-primary/30">
                <h3 className="mb-4 text-xl font-bold text-foreground">{titulo}</h3>
                <BloquePendiente titulo="Resumen pendiente" descripcion="Se publicará junto con el documento oficial." className="p-5" />
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">¿Tienes dudas? Contáctanos</h2>
          <p className="text-lg text-muted-foreground">
            Si tienes alguna duda, sugerencia o consulta sobre nuestros servicios o sobre este código de ética, puedes comunicarte con nosotros a través de:
          </p>
          <div className="grid gap-6 pt-4 md:grid-cols-3">
            {contactos.map((c) => (
              <div key={c.etiqueta} className="flex flex-col items-center rounded-xl border border-border/50 bg-card p-6 text-center">
                <span className="mb-2 text-sm font-bold uppercase text-primary">{c.etiqueta}</span>
                {c.contenido}
              </div>
            ))}
          </div>
        </section>

        <SolicitarDocumentoLegal
          titulo="¿Necesitas el documento completo?"
          descripcion="Solicita la versión completa del código de ética y te la hacemos llegar por correo electrónico."
          asunto="Solicitud del Código de Ética"
          etiquetaBoton="Solicitar Código de Ética"
        />
      </div>

      <DocumentoOficialVisor clave="codigoEtica" />
    </>
  );
}
