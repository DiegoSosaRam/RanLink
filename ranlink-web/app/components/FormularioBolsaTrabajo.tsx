"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CaptchaOpcional } from "@/components/CaptchaOpcional";
import { CORREO_CONTACTO } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";
import {
  RECAPTCHA_SITE_KEY,
  MENSAJE_CORREO_PENDIENTE,
  abrirCorreo,
  esCorreoValido,
  esTelefonoValido,
} from "@/lib/mailto";

const ESCOLARIDAD = ["Bachillerato", "Técnico", "Licenciatura", "Posgrado"];

const etiqueta = "block text-xs font-semibold uppercase tracking-widest text-muted-foreground";

/** Formulario de postulación: compone un correo; el CV se adjunta desde el correo. */
export function FormularioBolsaTrabajo() {
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    area: "",
    ubicacion: "",
    escolaridad: "",
    consentimiento: false,
  });
  const [captcha, setCaptcha] = useState<string | null>(null);

  const cambiar = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (!datos.area.trim()) errores.push("Indica el área o puesto que te interesa.");
    if (!datos.consentimiento) errores.push("Confirma que estás de acuerdo con el tratamiento de tus datos.");
    if (RECAPTCHA_SITE_KEY && !captcha) errores.push("Por favor confirma que no eres un robot.");

    if (errores.length > 0) {
      errores.forEach((m) => toast.error(m));
      return;
    }

    const r = abrirCorreo(CORREO_CONTACTO, `Postulación - ${datos.nombre.trim()}`, {
      "Nombre completo": datos.nombre.trim(),
      "Teléfono": datos.telefono.trim(),
      "Correo electrónico": datos.correo.trim(),
      "Área o puesto de interés": datos.area.trim(),
      "Ubicación": datos.ubicacion.trim(),
      "Escolaridad": datos.escolaridad,
      "IMPORTANTE": "no olvides adjuntar tu CV a este correo antes de enviarlo.",
    });

    if (!r.ok) {
      toast.error(MENSAJE_CORREO_PENDIENTE);
      return;
    }
    toast.success("Se abrirá tu aplicación de correo con tus datos. Adjunta tu CV y presiona enviar.");
  };

  return (
    <form onSubmit={enviar} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="nombre" className={etiqueta}>Nombre completo</label>
        <Input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} required placeholder="Escribe tu nombre completo" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="telefono" className={etiqueta}>Teléfono de contacto</label>
          <Input id="telefono" name="telefono" type="tel" value={datos.telefono} onChange={cambiar} placeholder="Tu número a 10 dígitos" />
        </div>
        <div className="space-y-2">
          <label htmlFor="correo" className={etiqueta}>Correo electrónico</label>
          <Input id="correo" name="correo" type="email" value={datos.correo} onChange={cambiar} placeholder="correo@ejemplo.com" />
        </div>
      </div>
      <p className="-mt-3 text-xs text-muted-foreground">Indica al menos un teléfono o un correo para poder responderte.</p>

      <div className="space-y-2">
        <label htmlFor="area" className={etiqueta}>Área o puesto de interés</label>
        <Input id="area" name="area" value={datos.area} onChange={cambiar} required placeholder="¿Qué área o puesto te interesa?" />
      </div>

      <div className="space-y-2">
        <label htmlFor="ubicacion" className={etiqueta}>¿Dónde radicas?</label>
        <Input id="ubicacion" name="ubicacion" value={datos.ubicacion} onChange={cambiar} placeholder="Localidad y estado" />
      </div>

      <div className="space-y-2">
        <label htmlFor="escolaridad" className={etiqueta}>Grado de estudios</label>
        <Select value={datos.escolaridad} onValueChange={(v) => setDatos((prev) => ({ ...prev, escolaridad: v }))}>
          <SelectTrigger id="escolaridad" className="h-10 w-full">
            <SelectValue placeholder="Selecciona" />
          </SelectTrigger>
          <SelectContent>
            {ESCOLARIDAD.map((nivel) => (
              <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* mailto no admite archivos adjuntos */}
      <div className="flex items-start gap-3 rounded-2xl border border-secondary/20 bg-secondary/10 p-4 text-sm text-foreground">
        <Paperclip className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
        <p>
          Este formulario no puede enviar archivos. Al presionar enviar se abrirá tu correo con tus datos:
          <strong> adjunta ahí tu CV</strong> antes de enviarlo.
        </p>
      </div>

      <CaptchaOpcional onChange={setCaptcha} />

      <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
        <Checkbox
          id="consentimiento"
          checked={datos.consentimiento}
          onCheckedChange={(v) => setDatos((prev) => ({ ...prev, consentimiento: v === true }))}
          className="mt-1"
        />
        <label htmlFor="consentimiento" className="cursor-pointer text-xs leading-relaxed text-muted-foreground">
          Estoy de acuerdo en que estos datos se almacenen y procesen con el fin de establecer contacto. Soy consciente de
          que puedo revocar mi consentimiento en cualquier momento. Consulta nuestro{" "}
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
