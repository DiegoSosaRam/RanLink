import Link from "next/link";
import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CORREO_CONTACTO, correoHref } from "@/lib/constants";

interface SolicitarDocumentoLegalProps {
  titulo: string;
  descripcion: string;
  /** Asunto del correo con el que se solicita el documento. */
  asunto: string;
  /** Texto del botón de correo. */
  etiquetaBoton: string;
}

/**
 * CTA común de las páginas legales para solicitar el documento por correo.
 * Si el correo de contacto sigue pendiente no hay mailto: que ofrecer, así que
 * el botón lleva a la sección de contacto.
 */
export function SolicitarDocumentoLegal({ titulo, descripcion, asunto, etiquetaBoton }: SolicitarDocumentoLegalProps) {
  const href = correoHref(CORREO_CONTACTO, asunto);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-card to-secondary/10 px-6 py-12 text-center sm:px-10 md:py-16">
      <div className="relative mx-auto max-w-2xl">
        <h2 className="mb-4 text-2xl font-bold md:text-3xl">{titulo}</h2>
        <p className="mb-8 text-muted-foreground">{descripcion}</p>
        {href ? (
          <Button asChild size="lg" variant="gold" className="h-auto whitespace-normal rounded-full px-8 py-3 text-base">
            <a href={href}>
              <Mail className="h-5 w-5" />
              {etiquetaBoton}
            </a>
          </Button>
        ) : (
          <Button asChild size="lg" variant="gold" className="h-auto whitespace-normal rounded-full px-8 py-3 text-base">
            <Link href="/#contacto">
              <MessageSquare className="h-5 w-5" />
              Contáctanos
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
