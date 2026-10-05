import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BloquePendiente } from "@/components/BloquePendiente";
import { cn } from "@/lib/utils";

interface TarjetaLegalPendienteProps {
  icon: LucideIcon;
  /** Título genérico de la sección (nunca un compromiso concreto de la empresa). */
  titulo: string;
  className?: string;
}

/**
 * Tarjeta de una página legal: icono, título genérico y el resumen pendiente.
 * El contenido sustantivo se publica junto con el documento oficial.
 */
export function TarjetaLegalPendiente({ icon: Icon, titulo, className }: TarjetaLegalPendienteProps) {
  return (
    <Card className={cn("border-border/50 bg-card/40 transition-colors hover:border-primary/30", className)}>
      <CardContent className="p-6 pt-6 sm:p-8">
        <div className="mb-5 flex items-center gap-4">
          <div className="shrink-0 rounded-xl bg-secondary/10 p-3 text-secondary">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold tracking-tight sm:text-xl">{titulo}</h2>
        </div>
        <BloquePendiente
          titulo="Resumen pendiente"
          descripcion="Se publicará junto con el documento oficial."
          className="p-5"
        />
      </CardContent>
    </Card>
  );
}
