import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "./BrandLogo";
import { Dato } from "./Pendiente";
import {
  CORREO_CONTACTO,
  DOMICILIO,
  HORARIO,
  NOMBRE_COMERCIAL,
  PLANES,
  REDES_SOCIALES,
  TELEFONO,
  correoHref,
  telefonoHref,
} from "@/lib/constants";
import { RUTAS } from "@/lib/rutas";

const SECCIONES = [
  {
    titulo: "Servicio",
    enlaces: [
      { label: "Internet hogar", href: "/#servicios" },
      { label: "Internet empresarial", href: RUTAS.empresarial },
      // Un enlace por plan vigente; mientras no haya planes, uno genérico.
      ...(PLANES.length > 0
        ? PLANES.map((plan) => ({ label: `${plan.nombre} · ${plan.velocidad}`, href: "/#planes" }))
        : [{ label: "Planes", href: "/#planes" }]),
      { label: "Cobertura", href: "/#cobertura" },
    ],
  },
  {
    titulo: "Contratación",
    enlaces: [
      { label: "Quiero contratar", href: RUTAS.quieroContratar },
      { label: "Requisitos de contratación", href: RUTAS.requisitos },
      { label: "Contrato de adhesión", href: RUTAS.contratoAdhesion },
      { label: "Carta de derechos del usuario", href: RUTAS.cartaDerechos },
      { label: "Cancelación o término de contrato", href: RUTAS.cancelacion },
      { label: "Sistema de facturación", href: RUTAS.facturacion },
    ],
  },
  {
    titulo: "Legal",
    enlaces: [
      { label: "Información regulatoria", href: RUTAS.informacionRegulatoria },
      { label: "Aviso de privacidad", href: RUTAS.avisoPrivacidad },
      { label: "Términos y condiciones", href: RUTAS.terminos },
      { label: "Código de prácticas comerciales", href: RUTAS.codigoPracticasComerciales },
      { label: "Código de políticas de gestión de red", href: RUTAS.codigoGestionRed },
      { label: "Código de ética", href: RUTAS.codigoEtica },
      { label: "Código de ética de comercio electrónico", href: RUTAS.codigoEticaComercioElectronico },
    ],
  },
  {
    titulo: "Empresa",
    enlaces: [
      { label: "Sobre nosotros", href: "/#inicio" },
      { label: "Buzón de quejas o sugerencias", href: RUTAS.buzonQuejas },
      { label: "Bolsa de trabajo", href: RUTAS.bolsaTrabajo },
      { label: "Contacto", href: "/#contacto" },
    ],
  },
];

export function Footer() {
  const tel = telefonoHref();
  const correo = correoHref(CORREO_CONTACTO);

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Marca y contacto */}
          <div>
            <Link href="/" className="mb-6 inline-block" aria-label={`${NOMBRE_COMERCIAL}, ir al inicio`}>
              <BrandLogo className="w-40" />
            </Link>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {tel ? <a href={tel} className="hover:text-primary">{TELEFONO}</a> : <Dato valor={TELEFONO} />}
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {correo ? (
                  <a href={correo} className="break-all hover:text-primary">{CORREO_CONTACTO}</a>
                ) : (
                  <Dato valor={CORREO_CONTACTO} />
                )}
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <Dato valor={DOMICILIO} />
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <Dato valor={HORARIO} />
              </li>
            </ul>

            {REDES_SOCIALES.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {REDES_SOCIALES.map((red) => (
                  <a
                    key={red.red}
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-muted px-3 py-1.5 text-xs font-semibold capitalize text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {red.red}
                  </a>
                ))}
              </div>
            )}
          </div>

          {SECCIONES.map((seccion) => (
            <div key={seccion.titulo}>
              <h3 className="mb-4 font-semibold text-foreground">{seccion.titulo}</h3>
              <ul className="space-y-3">
                {seccion.enlaces.map((enlace) => (
                  <li key={enlace.label}>
                    <Link href={enlace.href} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                      {enlace.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {NOMBRE_COMERCIAL}. Servicio de internet.
          </p>
          <div className="flex gap-6">
            <Link href={RUTAS.avisoPrivacidad} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacidad
            </Link>
            <Link href={RUTAS.terminos} className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
