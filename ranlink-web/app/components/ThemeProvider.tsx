"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Tema oscuro por defecto; la persona puede cambiar a claro con ThemeToggle
 * y la elección se recuerda en su navegador. No sigue la preferencia del
 * sistema: el oscuro es la identidad principal de la marca.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
