"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/**
 * Botón de cambio de tema, solo con íconos. Muestra el ícono del tema al que
 * se cambiará: sol en oscuro, luna en claro. Los dos íconos se alternan por
 * CSS, así el HTML estático coincide con lo que ve la persona desde el primer
 * pintado y no hay parpadeo al hidratar.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      aria-label="Cambiar entre tema claro y oscuro"
      title="Cambiar tema"
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/70 text-foreground backdrop-blur transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
      <Moon className="block h-5 w-5 dark:hidden" aria-hidden="true" />
    </button>
  );
}
