import { esPendiente } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Marcador visible para un dato que todavía no se ha proporcionado.
 * Se ve a propósito: un hueco evidente es mejor que un valor inventado.
 */
export function Pendiente({ children = "PENDIENTE", className }: { children?: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-dashed border-amber-500/50 bg-amber-500/10 px-2 py-0.5 font-mono text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Muestra el valor, o el marcador si el dato está pendiente. */
export function Dato({ valor, className }: { valor: string; className?: string }) {
  return esPendiente(valor) ? <Pendiente /> : <span className={className}>{valor}</span>;
}
