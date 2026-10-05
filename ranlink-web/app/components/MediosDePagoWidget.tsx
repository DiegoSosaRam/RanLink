"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dato } from "./Pendiente";
import { BloquePendiente } from "./BloquePendiente";
import {
  BANCO,
  BENEFICIARIO,
  CLABE,
  CUENTA_BANCARIA,
  FORMAS_DE_PAGO,
  NOMBRE_COMERCIAL,
  whatsappDisponible,
  whatsappHref,
} from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

/**
 * Botón flotante con los medios de pago, presente en todas las páginas.
 *
 * Los lineamientos piden que las formas de pago estén visibles en el sitio.
 * Un botón persistente cumple mejor que un popup de bienvenida, que se cierra
 * una vez y no vuelve.
 */
export function MediosDePagoWidget() {
  const [abierto, setAbierto] = useState(false);

  return (
    <Dialog open={abierto} onOpenChange={setAbierto}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Ver medios de pago"
          className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/95 px-4 py-3 text-sm font-bold text-primary shadow-2xl backdrop-blur transition-all hover:scale-105 hover:border-primary active:scale-95"
        >
          <Wallet className="h-5 w-5 shrink-0" />
          <span className="hidden sm:inline">Medios de pago</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Wallet className="h-5 w-5 text-primary" />
            Medios de pago
          </DialogTitle>
          <DialogDescription>Formas en las que puedes pagar tu servicio de {NOMBRE_COMERCIAL}.</DialogDescription>
        </DialogHeader>

        {FORMAS_DE_PAGO.length > 0 ? (
          <div className="space-y-3">
            {FORMAS_DE_PAGO.map((forma) => (
              <div key={forma.titulo} className="flex gap-4 rounded-2xl border border-border/50 bg-muted/30 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ArrowLeftRight className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground">{forma.titulo}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{forma.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <BloquePendiente titulo="Formas de pago pendientes de publicación" className="p-6" />
        )}

        <div className="space-y-1 rounded-2xl border border-border/50 bg-muted/30 p-4 text-xs text-muted-foreground">
          <p className="mb-2 text-sm font-bold text-foreground">Datos para transferencia</p>
          <p>Banco: <Dato valor={BANCO} /></p>
          <p>Cuenta: <Dato valor={CUENTA_BANCARIA} /></p>
          <p>CLABE: <Dato valor={CLABE} /></p>
          <p>Beneficiario: <Dato valor={BENEFICIARIO} /></p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold" className="flex-1">
            <Link href={RUTAS.facturacion} onClick={() => setAbierto(false)}>
              Ver facturación
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <a
              href={whatsappHref("Hola, quisiera confirmar los datos para realizar mi pago.")}
              onClick={() => setAbierto(false)}
              {...(whatsappDisponible() ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {whatsappDisponible() ? "Confirmar por WhatsApp" : "Ver contacto"}
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
