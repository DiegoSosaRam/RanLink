import { Button } from "@/components/ui/button";
import { BackgroundDecorations } from "./BackgroundDecorations";
import { BloquePendiente } from "./BloquePendiente";
import { SectionHeader } from "./SectionHeader";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

/**
 * Sección de servicios empresariales. Los servicios que ofrece Ranlink aún no
 * se conocen, así que la lista queda como bloque pendiente en lugar de
 * afirmar servicios concretos.
 */
const EnterpriseServicesSection = () => {
  return (
    <section id="empresarial" className="relative overflow-hidden bg-background py-16 md:py-24">
      {/* Fondo con degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <BackgroundDecorations variant="mixed" />

      <div className="container relative mx-auto px-4 sm:px-6">
        <SectionHeader
          title="Catálogo"
          highlightedText="Empresarial"
          description={`Aquí encontrarás los servicios de conectividad para empresas de ${NOMBRE_COMERCIAL}.`}
        >
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary">
            Para Empresas
          </span>
        </SectionHeader>

        {/* Lista de servicios */}
        <div className="mx-auto mb-12 max-w-3xl">
          <BloquePendiente
            titulo="Servicios empresariales pendientes de publicación"
            descripcion="El catálogo de servicios para empresas se publicará aquí en cuanto esté disponible. Mientras tanto, solicita una cotización y te contactaremos."
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-block w-full max-w-xl rounded-2xl border border-border bg-card/80 p-6 backdrop-blur-sm sm:p-8">
            <p className="mb-4 text-lg text-foreground">
              Cuéntanos qué necesita tu empresa y el equipo de {NOMBRE_COMERCIAL} te contactará.
            </p>
            <Button variant="gold" size="lg" asChild>
              <a href="#contacto-empresarial">Solicitar cotización</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseServicesSection;
