"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CaptchaOpcional } from "@/components/CaptchaOpcional";
import { CORREO_CONTACTO, NOMBRE_COMERCIAL } from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";
import {
  RECAPTCHA_SITE_KEY,
  MENSAJE_CORREO_PENDIENTE,
  abrirCorreo,
  esCorreoValido,
  esTelefonoValido,
} from "@/lib/mailto";

/** Formulario de cotización empresarial: compone un correo, no hay backend. */
const EnterpriseContactForm = () => {
  const [datos, setDatos] = useState({
    empresa: "",
    contacto: "",
    telefono: "",
    correo: "",
    asunto: "",
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
    if (!datos.empresa.trim()) errores.push("Escribe el nombre de la empresa.");
    if (!datos.contacto.trim()) errores.push("Escribe el nombre de la persona de contacto.");
    if (!datos.telefono.trim() && !datos.correo.trim()) {
      errores.push("Déjanos un teléfono o un correo para poder contactarte.");
    }
    if (datos.correo.trim() && !esCorreoValido(datos.correo)) errores.push("Ingresa un correo electrónico válido.");
    if (datos.telefono.trim() && !esTelefonoValido(datos.telefono)) {
      errores.push("El teléfono debe tener 10 dígitos numéricos.");
    }
    if (!datos.consentimiento) errores.push("Por favor acepta el aviso de privacidad.");
    if (RECAPTCHA_SITE_KEY && !captcha) errores.push("Por favor confirma que no eres un robot.");

    if (errores.length > 0) {
      errores.forEach((m) => toast.error(m));
      return;
    }

    const r = abrirCorreo(CORREO_CONTACTO, `Contacto empresarial - ${datos.empresa.trim()}`, {
      "Empresa": datos.empresa.trim(),
      "Persona de contacto": datos.contacto.trim(),
      "Teléfono": datos.telefono.trim(),
      "Correo electrónico": datos.correo.trim(),
      "Asunto": datos.asunto.trim(),
    });

    if (!r.ok) {
      toast.error(MENSAJE_CORREO_PENDIENTE);
      return;
    }
    toast.success("Se abrirá tu aplicación de correo con los datos listos. Solo presiona enviar.");
  };

  const etiqueta = "mb-2 block text-sm font-medium text-foreground";

  return (
    <section id="contacto-empresarial" className="relative overflow-hidden py-16 md:py-24">
      {/* Fondo con degradado */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-card/50" />

      {/* Elementos decorativos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Texto */}
          <div>
            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              <span className="text-foreground">Déjanos todos tus datos</span>
              <br />
              <span className="text-foreground">para que el equipo</span>
              <br />
              <span className="gradient-text">Empresarial te contacte.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Cuéntanos qué necesita tu empresa y el equipo de {NOMBRE_COMERCIAL} te responderá.
            </p>
          </div>

          {/* Formulario */}
          <div className="rounded-2xl border border-border bg-card/90 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <form onSubmit={enviar} className="space-y-5">
              <div>
                <label htmlFor="empresa" className={etiqueta}>Nombre de la empresa*</label>
                <Input
                  id="empresa"
                  name="empresa"
                  value={datos.empresa}
                  onChange={cambiar}
                  required
                  className="border-border bg-background/50 focus:border-primary"
                  placeholder="Tu empresa"
                />
              </div>

              <div>
                <label htmlFor="contacto" className={etiqueta}>Nombre del contacto*</label>
                <Input
                  id="contacto"
                  name="contacto"
                  value={datos.contacto}
                  onChange={cambiar}
                  required
                  className="border-border bg-background/50 focus:border-primary"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="telefono" className={etiqueta}>Teléfono de contacto</label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={datos.telefono}
                  onChange={cambiar}
                  className="border-border bg-background/50 focus:border-primary"
                  placeholder="10 dígitos"
                />
              </div>

              <div>
                <label htmlFor="correo" className={etiqueta}>Correo electrónico</label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  value={datos.correo}
                  onChange={cambiar}
                  className="border-border bg-background/50 focus:border-primary"
                  placeholder="correo@empresa.com"
                />
                <p className="mt-2 text-xs text-muted-foreground">Indica al menos un teléfono o un correo.</p>
              </div>

              <div>
                <label htmlFor="asunto" className={etiqueta}>Asunto</label>
                <Input
                  id="asunto"
                  name="asunto"
                  value={datos.asunto}
                  onChange={cambiar}
                  className="border-border bg-background/50 focus:border-primary"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="consentimiento"
                  checked={datos.consentimiento}
                  onCheckedChange={(v) => setDatos((prev) => ({ ...prev, consentimiento: v === true }))}
                  className="mt-1"
                />
                <label htmlFor="consentimiento" className="text-xs leading-relaxed text-muted-foreground">
                  Estoy de acuerdo en que estos datos se almacenen y procesen con el fin de establecer contacto. Soy
                  consciente de que puedo revocar mi consentimiento en cualquier momento. Consulta nuestro{" "}
                  <Link href={RUTAS.avisoPrivacidad} className="font-semibold text-primary hover:underline">
                    Aviso de Privacidad
                  </Link>
                  .*
                </label>
              </div>

              <CaptchaOpcional onChange={setCaptcha} />

              <Button type="submit" variant="gold" size="lg" className="w-full">
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseContactForm;
