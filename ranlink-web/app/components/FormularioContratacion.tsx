"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CaptchaOpcional } from "@/components/CaptchaOpcional";
import { CORREO_CONTACTO, PLANES } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";
import {
  RECAPTCHA_SITE_KEY,
  MENSAJE_CORREO_PENDIENTE,
  abrirCorreo,
  esCorreoValido,
  esTelefonoValido,
} from "@/lib/mailto";

/** Valor de la opción para quien aún no elige plan. */
const SIN_PLAN = "sin-definir";

const etiqueta = "block text-xs font-semibold uppercase tracking-widest text-muted-foreground";

/** Formulario de solicitud de contratación: compone un correo, no hay backend. */
export function FormularioContratacion() {
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    plan: SIN_PLAN,
    domicilio: "",
    mensaje: "",
    consentimiento: false,
  });
  const [captcha, setCaptcha] = useState<string | null>(null);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();

    const errores: string[] = [];
    if (!datos.nombre.trim()) errores.push("Escribe tu nombre completo.");
    if (!datos.telefono.trim() && !datos.correo.trim()) {
      errores.push("Déjanos un teléfono o un correo para poder contactarte.");
    }
    if (datos.correo.trim() && !esCorreoValido(datos.correo)) errores.push("Ingresa un correo electrónico válido.");
    if (datos.telefono.trim() && !esTelefonoValido(datos.telefono)) {
      errores.push("El teléfono debe tener 10 dígitos numéricos.");
    }
    if (!datos.consentimiento) errores.push("Confirma que has leído el aviso de privacidad.");
    if (RECAPTCHA_SITE_KEY && !captcha) errores.push("Por favor verifica que no eres un robot.");

    if (errores.length > 0) {
      errores.forEach((m) => toast.error(m));
      return;
    }

    const plan = PLANES.find((p) => p.nombre === datos.plan);
    const r = abrirCorreo(CORREO_CONTACTO, `Solicitud de contratación - ${datos.nombre.trim()}`, {
      "Nombre completo": datos.nombre.trim(),
      "Teléfono": datos.telefono.trim(),
      "Correo electrónico": datos.correo.trim(),
      "Plan de interés": plan ? `${plan.nombre} (${plan.precio} al mes)` : "Aún no sé / quiero información",
      "Domicilio o referencia de instalación": datos.domicilio.trim(),
      "Mensaje": datos.mensaje.trim(),
    });

    if (!r.ok) {
      toast.error(MENSAJE_CORREO_PENDIENTE);
      return;
    }
    toast.success("Se abrirá tu aplicación de correo con el mensaje listo. Solo presiona enviar.");
  };

  return (
    <form onSubmit={enviar} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="nombre" className={etiqueta}>Nombre completo</label>
        <Input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} required placeholder="Tu nombre completo" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="telefono" className={etiqueta}>Teléfono</label>
          <Input id="telefono" name="telefono" type="tel" value={datos.telefono} onChange={cambiar} placeholder="10 dígitos" />
        </div>
        <div className="space-y-2">
          <label htmlFor="correo" className={etiqueta}>Correo electrónico</label>
          <Input id="correo" name="correo" type="email" value={datos.correo} onChange={cambiar} placeholder="tu@correo.com" />
        </div>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">Indica al menos un teléfono o un correo para poder responderte.</p>

      <div className="space-y-2">
        <label htmlFor="plan" className={etiqueta}>Plan de interés</label>
        <Select value={datos.plan} onValueChange={(v) => setDatos((prev) => ({ ...prev, plan: v }))}>
          <SelectTrigger id="plan" className="h-10 w-full">
            <SelectValue placeholder="Selecciona" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SIN_PLAN}>Aún no sé / quiero información</SelectItem>
            {PLANES.map((p) => (
              <SelectItem key={p.nombre} value={p.nombre}>
                {p.nombre} — {p.precio} al mes
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="domicilio" className={etiqueta}>Domicilio o referencia de instalación</label>
        <Textarea
          id="domicilio"
          name="domicilio"
          rows={3}
          value={datos.domicilio}
          onChange={cambiar}
          placeholder="Calle, número, colonia, localidad y alguna referencia para ubicarte"
          className="resize-none"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="mensaje" className={etiqueta}>Mensaje</label>
        <Textarea
          id="mensaje"
          name="mensaje"
          rows={4}
          value={datos.mensaje}
          onChange={cambiar}
          placeholder="Cuéntanos más sobre tus requerimientos o dudas"
          className="resize-none"
        />
      </div>

      <CaptchaOpcional onChange={setCaptcha} />

      <div className="flex items-start gap-3">
        <Checkbox
          id="consentimiento"
          checked={datos.consentimiento}
          onCheckedChange={(v) => setDatos((prev) => ({ ...prev, consentimiento: v === true }))}
          className="mt-1"
        />
        <label htmlFor="consentimiento" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
          He leído y acepto el tratamiento de mis datos personales según el{" "}
          <Link href={RUTAS.avisoPrivacidad} className="font-bold text-primary hover:underline">
            Aviso de Privacidad
          </Link>
          .
        </label>
      </div>

      <Button type="submit" variant="gold" size="lg" className="w-full">
        Enviar solicitud
      </Button>
    </form>
  );
}
