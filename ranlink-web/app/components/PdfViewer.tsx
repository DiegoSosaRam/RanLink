import { Download, ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NOMBRE_COMERCIAL } from '@/lib/constants';

interface PdfViewerProps {
  /** Ruta pública del PDF, p. ej. "/legal/aviso-de-privacidad.pdf" */
  src: string;
  /** Título mostrado en la cabecera del visor. */
  title: string;
  /** Texto opcional bajo el título. */
  description?: string;
  /** Alto del visor. Por defecto suficiente para leer una carta completa. */
  height?: string;
}

/**
 * Visor de documentos legales embebido.
 *
 * Usa <object> en vez de <iframe> porque permite declarar un contenido de
 * respaldo: si el navegador no sabe mostrar PDFs en línea (caso típico de
 * Safari en iOS y de varios navegadores móviles), en lugar de un recuadro en
 * blanco se muestran los botones para abrir o descargar el documento.
 */
export const PdfViewer = ({ src, title, description, height = 'clamp(480px, 80vh, 900px)' }: PdfViewerProps) => (
  <section className="max-w-5xl mx-auto px-6 py-12">
    <div className="rounded-[32px] border border-border/50 bg-card/40 overflow-hidden shadow-2xl">
      {/* Cabecera */}
      <div className="flex flex-col gap-4 border-b border-border/50 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4 min-w-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-foreground">{title}</h2>
            {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>

        <div className="flex shrink-0 gap-3">
          <a href={src} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Abrir
            </Button>
          </a>
          <a href={src} download>
            <Button variant="gold" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Descargar
            </Button>
          </a>
        </div>
      </div>

      {/* Documento */}
      <div className="bg-muted/20" style={{ height }}>
        <object data={src} type="application/pdf" className="h-full w-full" aria-label={title}>
          <div className="flex h-full flex-col items-center justify-center gap-5 p-10 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <p className="max-w-md text-sm text-muted-foreground">
              Tu navegador no puede mostrar el documento aquí mismo. Ábrelo en una pestaña nueva
              o descárgalo para consultarlo.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={src} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Abrir documento
                </Button>
              </a>
              <a href={src} download>
                <Button variant="gold" className="gap-2">
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </Button>
              </a>
            </div>
          </div>
        </object>
      </div>
    </div>

    <p className="mt-4 text-center text-xs text-muted-foreground">
      Documento oficial de {NOMBRE_COMERCIAL}. Si tienes dudas sobre su contenido, contáctanos y con gusto te lo explicamos.
    </p>
  </section>
);

export default PdfViewer;
