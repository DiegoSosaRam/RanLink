"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "./BrandLogo";
import { ThemeToggle } from "./ThemeToggle";
import { NOMBRE_COMERCIAL, TELEFONO, telefonoHref } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";
import { cn } from "@/lib/utils";

const ENLACES = [
  { label: "Inicio", href: "/" },
  { label: "Planes", href: "/#planes" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Requisitos", href: "/#requisitos" },
  { label: "Cobertura", href: "/#cobertura" },
  { label: "Contacto", href: "/#contacto" },
];

/** Barra de navegación flotante, común a todas las páginas. */
export function Navbar() {
  const [conScroll, setConScroll] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const tel = telefonoHref();

  useEffect(() => {
    const alHacerScroll = () => setConScroll(window.scrollY > 20);
    alHacerScroll();
    window.addEventListener("scroll", alHacerScroll, { passive: true });
    return () => window.removeEventListener("scroll", alHacerScroll);
  }, []);

  return (
    <nav
      className={cn(
        "glass-nav fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 rounded-2xl transition-shadow duration-500",
        conScroll && "shadow-2xl",
      )}
    >
      <div className="px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Marca: isotipo + nombre (pendiente de un logo horizontal oficial) */}
          <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${NOMBRE_COMERCIAL}, ir al inicio`}>
            <BrandLogo variante="isotipo" className="w-11 shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="text-lg font-bold tracking-[0.12em] text-foreground">RANLINK</span>
              <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.42em] text-primary">TELECOM</span>
            </span>
          </Link>

          {/* Navegación de escritorio */}
          <div className="hidden items-center gap-1 lg:flex">
            {ENLACES.map((enlace) => (
              <a
                key={enlace.label}
                href={enlace.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                {enlace.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {tel && (
              <a href={tel} className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Phone className="h-4 w-4" />
                <span>{TELEFONO}</span>
              </a>
            )}
            <ThemeToggle />
            <Button asChild variant="gold" size="sm">
              <Link href={RUTAS.quieroContratar}>¡Contratar!</Link>
            </Button>
          </div>

          {/* Controles móviles */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setMenuAbierto((abierto) => !abierto)}
              aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuAbierto}
            >
              {menuAbierto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <div className="animate-fade-in mt-3 border-t border-border/60 pb-2 pt-3 lg:hidden">
            <div className="flex flex-col gap-1">
              {ENLACES.map((enlace) => (
                <a
                  key={enlace.label}
                  href={enlace.href}
                  onClick={() => setMenuAbierto(false)}
                  className="rounded-lg px-3 py-3 font-medium text-foreground/80 transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  {enlace.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                {tel && (
                  <a href={tel} className="flex items-center gap-2 px-3 font-semibold text-primary">
                    <Phone className="h-4 w-4" />
                    <span>{TELEFONO}</span>
                  </a>
                )}
                <Button asChild variant="gold" className="w-full">
                  <Link href={RUTAS.quieroContratar} onClick={() => setMenuAbierto(false)}>
                    ¡Contratar!
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
