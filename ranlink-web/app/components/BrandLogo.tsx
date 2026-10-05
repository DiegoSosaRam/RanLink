import { NOMBRE_COMERCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  /** "completo": símbolo y texto. "isotipo": solo el símbolo. */
  variante?: "completo" | "isotipo";
}

/**
 * Logo de la marca. En la versión completa se alternan por CSS la variante
 * para fondo oscuro (texto claro) y la de fondo claro (texto marino).
 * Las imágenes se generan con `node marca/generar-logos.cjs`.
 */
export function BrandLogo({ className, variante = "completo" }: BrandLogoProps) {
  if (variante === "isotipo") {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- export estático, sin optimizador de imágenes
      <img src="/brand/isotipo.webp" alt={NOMBRE_COMERCIAL} width={400} height={293} className={cn("h-auto", className)} />
    );
  }

  return (
    <span className={cn("inline-block", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-oscuro.webp" alt={NOMBRE_COMERCIAL} width={900} height={800} className="hidden h-auto w-full dark:block" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/logo-claro.webp" alt={NOMBRE_COMERCIAL} width={900} height={800} className="block h-auto w-full dark:hidden" />
    </span>
  );
}
