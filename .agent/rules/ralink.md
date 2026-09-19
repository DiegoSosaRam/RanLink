---
trigger: always_on
---

# Reglas del proyecto

Estas son las reglas vigentes. Reflejan cómo se construyó realmente el sitio,
no solo la intención inicial. Al final del archivo hay un bloque histórico
comentado que **no debe seguirse**.

## 1. Renderizado y SEO

- SSR primero. Usa Server Components por defecto.
- `"use client"` va en el **componente interactivo** (un formulario, un
  carrusel), nunca en la página completa. Una página marcada como client no
  puede exportar `metadata` y queda sin título ni descripción para buscadores.
- Toda página debe exportar `metadata` con `title` y `description` propios.
- Al agregar una ruta, añádela también a `app/sitemap.ts`.

## 2. Stack

- Next.js (App Router), React, TypeScript, Tailwind v4, componentes shadcn/ui.
- Salida estática: `output: "export"` con `trailingSlash: true`. El sitio se
  sube por FTP a Hostinger, así que **no hay servidor**: nada de API routes,
  Server Actions, middleware ni `next/image` con optimización en tiempo real.

## 3. Datos del negocio

- **Nunca inventes datos.** Ni folios, ni RFC, ni domicilios, ni cuentas
  bancarias, ni precios, ni fechas. Si falta un dato, díselo a la persona y
  déjalo pendiente.
- Si hace falta un marcador, que **se note que es un marcador**: `PENDIENTE`,
  `XXXX`. Jamás un valor con apariencia real; una CLABE falsa de 18 dígitos
  puede provocar transferencias a una cuenta inexistente.
- Todo dato de la empresa vive en `app/lib/constants.ts`: titular, RFC,
  domicilio, horario, teléfonos, correos, folios y URLs oficiales. No lo
  repitas en las páginas. Este sitio llegó a tener tres domicilios distintos
  por no centralizarlos.
- El regulador vigente es la **Comisión Reguladora de Telecomunicaciones
  (CRT)**. "IFT" es el nombre anterior.

## 4. Formularios

- Sin backend: los formularios componen un `mailto:` con los datos capturados
  y lo abren en la aplicación de correo de la persona.
- Prohibido simular el envío. Nada de `setTimeout` seguido de un mensaje de
  éxito: eso pierde solicitudes reales y le miente al usuario.
- Pide siempre un medio de contacto de vuelta (correo o teléfono).
- reCAPTCHA: renderízalo y exígelo **solo si** `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  existe. Sin ese guardado, el literal de relleno queda compilado en el bundle
  y bloquea el envío en producción.

## 5. Interfaz

- Revisa `app/components/` antes de crear algo nuevo. Reutiliza y compón.
- **Ningún CTA muerto.** Todo botón necesita `href` o `onClick`. Si el destino
  no existe todavía, cambia el texto por uno que sí puedas cumplir.
- El `<Toaster />` de sonner debe estar montado en `app/layout.tsx`. Sin él,
  los mensajes de error de validación se emiten pero nunca se ven.
- Documentos legales: se publican en `public/legal/` y se embeben con
  `PdfViewer`, que usa `<object>` en vez de `<iframe>` para poder mostrar
  botones de respaldo cuando el navegador no renderiza PDFs (Safari en iOS).

## 6. Verificación antes de dar algo por terminado

1. `npx tsc --noEmit`
2. `npm run build`
3. Comprobar el resultado en `out/`, no solo el código fuente.
4. Revisar en el navegador a 375px y a ~1440px. Cero scroll horizontal:
   mide `scrollWidth - clientWidth` y localiza el elemento culpable antes de
   tocar nada. Un elemento ancho suele ser síntoma, no causa.

## 7. Navegador (último recurso)

Si algo no se resuelve leyendo el código, puedes inspeccionarlo en el
navegador. Documenta el hallazgo antes de cambiar código.

<!--
=========================================================================
BLOQUE HISTÓRICO — NO SEGUIR ESTAS INSTRUCCIONES.
Se conserva solo como referencia de la versión original del archivo.
Las reglas vigentes son las de arriba. Si algo aquí contradice lo de
arriba, ignora esto por completo.
=========================================================================

(El archivo original comenzaba con el frontmatter `trigger: always_on`.)

Frontend Architecture, SSR & SEO

1. Rendering Strategy & SEO Priority

The website must be fully SSR-first.

Strong SEO is a top priority:

Prefer Server Components by default.

Avoid unnecessary client-side rendering.

Ensure metadata, titles, and structured content are rendered server-side.

2. Technology Stack

Framework: Next.js (App Router)

Library: React

Language: TypeScript

Follow App Router conventions for layouts, pages, and metadata.

3. Component Reuse & Frontend Design

Before creating new UI elements:

Review existing components inside the components/ directory.

Reuse pre-made components whenever possible.

Avoid rewriting UI logic that already exists unless refactoring is required.

4. Code Efficiency & Maintainability

Write minimal and intentional frontend code.

Prefer composition over duplication.

Keep components small, readable, and reusable.

5. Debugging & Browser Control (Last Resort)

If an issue cannot be resolved through code inspection:

You may take control of a browser to inspect behavior directly.

Use this only when strictly necessary.

Document any findings before applying code changes.

Short Agent Rule (Optional)

"Prioritize SSR and SEO, follow Next.js App Router best practices, reuse existing components, and avoid unnecessary client-side logic."
-->
