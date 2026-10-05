"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_SITE_KEY } from "@/lib/mailto";

/**
 * reCAPTCHA condicional: solo se renderiza si existe
 * NEXT_PUBLIC_RECAPTCHA_SITE_KEY. Sin clave no se muestra nada y el
 * formulario NO debe exigirlo; compruébalo con `RECAPTCHA_SITE_KEY && !token`.
 */
export function CaptchaOpcional({ onChange }: { onChange: (token: string | null) => void }) {
  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <div className="flex justify-center overflow-hidden">
      <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={onChange} theme="dark" />
    </div>
  );
}
