import { esPendiente } from './constants';

/**
 * Formularios sin backend: se compone un mailto: con los datos capturados y
 * se abre la aplicación de correo de la persona, que es quien lo envía.
 *
 * Nunca simular el envío (setTimeout + mensaje de éxito): eso pierde
 * solicitudes reales y le miente a quien escribe.
 */

/** Clave de reCAPTCHA. Solo si existe se renderiza y se exige el captcha. */
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || undefined;

export type ResultadoCorreo =
  | { ok: true }
  | { ok: false; motivo: 'correo-pendiente' };

/**
 * Abre la app de correo con el mensaje armado.
 * @param campos pares etiqueta → valor; los vacíos se omiten.
 */
export function abrirCorreo(destino: string, asunto: string, campos: Record<string, string>): ResultadoCorreo {
  // Sin correo de destino real no hay a dónde enviar: se avisa en lugar de fingir.
  if (esPendiente(destino)) return { ok: false, motivo: 'correo-pendiente' };

  const cuerpo = Object.entries(campos)
    .filter(([, valor]) => valor.trim() !== '')
    .map(([etiqueta, valor]) => `${etiqueta}: ${valor}`)
    .join('\n');

  window.location.href = `mailto:${destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  return { ok: true };
}

/** Mensaje para el toast cuando el correo de destino aún no está configurado. */
export const MENSAJE_CORREO_PENDIENTE =
  'El correo de recepción aún no está configurado, así que tu mensaje no se puede enviar todavía. Comunícate por teléfono o WhatsApp.';

export const esCorreoValido = (correo: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());

/** Teléfono mexicano de 10 dígitos (se ignoran espacios y guiones). */
export const esTelefonoValido = (telefono: string) => /^\d{10}$/.test(telefono.replace(/[\s-]/g, ''));
