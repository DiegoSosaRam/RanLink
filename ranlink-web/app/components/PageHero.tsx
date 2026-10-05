import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  icon?: LucideIcon;
  /** Etiqueta pequeña sobre el título. */
  etiqueta?: string;
  titulo: string;
  /** Parte del título resaltada con el degradado de la marca. */
  resaltado?: string;
  descripcion?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/** Encabezado común de las páginas internas (deja espacio para el navbar fijo). */
export function PageHero({ icon: Icon, etiqueta, titulo, resaltado, descripcion, className, children }: PageHeroProps) {
  return (
    <section className={cn("hero-gradient relative overflow-hidden px-4 pb-14 pt-32 text-center sm:px-6 md:pt-40", className)}>
      <div className="relative mx-auto max-w-4xl">
        {Icon && !etiqueta && (
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary/10 shadow-xl shadow-primary/5">
            <Icon className="h-10 w-10 text-primary" />
          </div>
        )}
        {etiqueta && (
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">
            {Icon && <Icon className="h-4 w-4" />}
            {etiqueta}
          </div>
        )}
        <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight md:text-6xl">
          {titulo} {resaltado && <span className="gradient-text">{resaltado}</span>}
        </h1>
        {descripcion && <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">{descripcion}</p>}
        {children}
      </div>
    </section>
  );
}
