import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NOMBRE_COMERCIAL } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: NOMBRE_COMERCIAL,
  description: `PENDIENTE: descripción del servicio de ${NOMBRE_COMERCIAL}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // next-themes escribe la clase del tema en <html> antes de hidratar;
    // suppressHydrationWarning evita el aviso por esa diferencia esperada.
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
          {/* Sin este Toaster, los mensajes de los formularios (incluidos los
              errores de validación) se emiten pero nunca se muestran. */}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
