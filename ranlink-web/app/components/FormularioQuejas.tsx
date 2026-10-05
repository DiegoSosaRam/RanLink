"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CaptchaOpcional } from "@/components/CaptchaOpcional";
import { CORREO_CONTACTO, CORREO_SOPORTE, esPendiente } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";
import {
  RECAPTCHA_SITE_KEY,
  MENSAJE_CORREO_PENDIENTE,
  abrirCorreo,
  esCorreoValido,
  esTelefonoValido,
} from "@/lib/mailto";

const etiqueta = "ml-1 block text-sm font-bold uppercase tracking-widest text-muted-foreground";

/** Formulario del buzón de quejas y sugerencias: compone un correo, no hay backend. */
export function FormularioQuejas() {
  const [datos, setDatos] = useState({ nombre: "", contacto: "", mensaje: "", acepta: false });
  const [captcha, setCaptcha] = useState<string | null>(null);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    const contacto = datos.contacto.trim();
    const errores: string[] = [];
    if (!datos.nombre.trim()) errores.push("Escribe tu nombre.");
    if (!contacto) {
      errores.push("Déjanos un correo o teléfono para poder darte seguimiento.");
    } else if (!esCorreoValido(contacto) && !esTelefonoValido(contacto)) {
      errores.push("Ingresa un correo válido o un teléfono de 10 dígitos.");
    }
    if (datos.mensaje.trim().length < 10) {
      errores.push("El mensaje es muy corto. Por favor detalla un poco más (mínimo 10 caracteres).");
    }
    if (!datos.acepta) errores.push("Debes aceptar el aviso de privacidad para continuar.");
    if (RECAPTCHA_SITE_KEY && !captcha) errores.push("Por favor, completa el reCAPTCHA.");

    if (errores.length > 0) {
      errores.forEach((m) => toast.error(m));
      return;
    }

    // Si no hay correo de soporte, las quejas llegan al correo de contacto.
    const destino = esPendiente(CORREO_SOPORTE) ? CORREO_CONTACTO : CORREO_SOPORTE;
    const r = abrirCorreo(destino, `Queja o sugerencia - ${datos.nombre.trim()}`, {
      "Nombre": datos.nombre.trim(),
      "Datos de contacto": contacto,
      "Mensaje": datos.mensaje.trim(),
    });

    if (!r.ok) {
      toast.error(MENSAJE_CORREO_PENDIENTE);
      return;
    }
    toast.success("Se abrirá tu aplicación de correo con el mensaje listo. Solo presiona enviar.");
  };

  return (
    <form onSubmit={enviar} className="space-y-8">
      <div className="space-y-3">
        <label htmlFor="nombre" className={etiqueta}>Tu nombre</label>
        <Input
          id="nombre"
          name="nombre"
          required
          value={datos.nombre}
          onChange={cambiar}
          placeholder="¿Cómo te llamas?"
          className="h-12 rounded-2xl px-5"
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="contacto" className={etiqueta}>Correo o teléfono</label>
        <Input
          id="contacto"
          name="contacto"
          required
          value={datos.contacto}
          onChange={cambiar}
          placeholder="¿A dónde te respondemos?"
          className="h-12 rounded-2xl px-5"
        />
      </div>

      <div className="space-y-3">
        <label htmlFor="mensaje" className={etiqueta}>Tu mensaje</label>
        <Textarea
          id="mensaje"
          name="mensaje"
          required
          rows={5}
          value={datos.mensaje}
          onChange={cambiar}
          placeholder="Cuéntanos con total libertad cómo podemos mejorar o en qué te podemos ayudar"
          className="resize-none rounded-2xl px-5 py-4"
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-muted/40 p-5 sm:p-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Al enviar este formulario, aceptas que usemos tus datos únicamente para darte seguimiento a tu mensaje.
        </p>
        <div className="flex items-start gap-3">
          <Checkbox
            id="acepta"
            checked={datos.acepta}
            onCheckedChange={(v) => setDatos((prev) => ({ ...prev, acepta: v === true }))}
            className="mt-1"
          />
          <label htmlFor="acepta" className="cursor-pointer text-sm font-semibold text-foreground">
            Acepto el{" "}
            <Link href={RUTAS.avisoPrivacidad} className="text-primary hover:underline">
              Aviso de Privacidad
            </Link>
            .
          </label>
        </div>
      </div>

      <CaptchaOpcional onChange={setCaptcha} />

      <Button type="submit" size="lg" className="w-full gap-3 rounded-2xl py-6 text-base font-black uppercase tracking-widest">
        Enviar
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
