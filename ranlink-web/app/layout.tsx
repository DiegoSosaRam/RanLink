import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./index.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MediosDePagoWidget } from "@/components/MediosDePagoWidget";
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
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          {/* Los lineamientos piden que las formas de pago estén visibles en
              todo el sitio, por eso el acceso vive en el layout. */}
          <MediosDePagoWidget />
          {/* Sin este Toaster, los mensajes de los formularios (incluidos los
              errores de validación) se emiten pero nunca se muestran. */}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
