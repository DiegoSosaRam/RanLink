import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Espacio reservado para contenido que aún no existe (planes, mapas,
 * documentos). Deja claro que falta, sin rellenarlo con datos inventados.
 */
export function BloquePendiente({
  titulo,
  descripcion,
  className,
  children,
}: {
  titulo: string;
  descripcion?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card/40 p-8 text-center",
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400">
        <Clock className="h-6 w-6" />
      </div>
      <p className="font-semibold text-foreground">{titulo}</p>
      {descripcion && <p className="max-w-md text-sm text-muted-foreground">{descripcion}</p>}
      {children}
    </div>
  );
}
