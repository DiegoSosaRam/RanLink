/**
 * Datos oficiales de Ranlink.
 *
 * Todo dato del negocio vive aquí y NUNCA se escribe directo en una página:
 * en el proyecto anterior llegaron a convivir tres domicilios distintos por
 * no centralizarlos.
 *
 * Los valores marcados como PENDIENTE deben sustituirse por los datos reales
 * antes de publicar. No los rellenes con valores inventados: un dato fiscal o
 * bancario con apariencia real puede provocar daños reales.
 */

export const NOMBRE_COMERCIAL = 'Ranlink';

/** Titular de la autorización (persona física o moral). */
export const TITULAR = 'PENDIENTE';
export const RFC = 'PENDIENTE';

/** Domicilio del centro de atención a clientes y domicilio legal. */
export const DOMICILIO = 'PENDIENTE';
/** Versión corta para espacios reducidos. */
export const DOMICILIO_CORTO = 'PENDIENTE';

export const HORARIO = 'PENDIENTE';

export const TELEFONO = 'PENDIENTE';
/** Solo dígitos, para los enlaces de WhatsApp: 52 + 10 dígitos. */
export const WHATSAPP = 'PENDIENTE';
export const CORREO_CONTACTO = 'PENDIENTE';
export const CORREO_SOPORTE = 'PENDIENTE';
export const CORREO_FACTURACION = 'PENDIENTE';

export const SITIO_URL = 'https://PENDIENTE';

/** Redes sociales oficiales. Vacío hasta tener las URL reales. */
export const REDES_SOCIALES: { red: 'facebook' | 'instagram' | 'tiktok' | 'x' | 'youtube' | 'linkedin'; url: string }[] = [];

/** Portal de facturación o de autogestión de clientes. */
export const FACTURACION_URL = 'PENDIENTE';

/** Constancia de inscripción en el Registro Público de Concesiones (CRT). */
export const AUTORIZACION_FOLIO = 'PENDIENTE';
export const AUTORIZACION_INSCRIPCION = 'PENDIENTE';
export const AUTORIZACION_FECHA = 'PENDIENTE';
export const AUTORIZACION_VIGENCIA = 'PENDIENTE';

/** Contrato de adhesión registrado ante PROFECO. */
export const CONTRATO_REGISTRO = 'PENDIENTE';
export const CONTRATO_REGISTRO_FECHA = 'PENDIENTE';
export const CONTRATO_OFICIO = 'PENDIENTE';
/** Enlace al buró comercial de PROFECO para verificación independiente. */
export const CONTRATO_ADHESION_URL = 'https://burocomercial.profeco.gob.mx/';

/** Visor oficial de tarifas de la CRT. */
export const VISOR_TARIFAS_URL = 'https://tarifas.ift.org.mx/ift_visor/';
/** Lineamientos de calidad del servicio fijo (DOF 25/02/2020). */
export const LINEAMIENTOS_CALIDAD_URL =
  'https://dof.gob.mx/nota_detalle.php?codigo=5587373&fecha=25/02/2020';
/** Lineamientos de transparencia de la información (DOF 12/02/2020). */
export const LINEAMIENTOS_TRANSPARENCIA_URL =
  'https://www.dof.gob.mx/nota_detalle.php?codigo=5586224&fecha=12/02/2020';


/* -------------------------------------------------------------------------- */
/* Planes, cobertura y documentos                                              */
/* -------------------------------------------------------------------------- */

export interface Plan {
  nombre: string;
  /** Tal como se anuncia, p. ej. "50 Megas". */
  velocidad: string;
  /** Precio mensual con IVA, tal como está inscrito ante la CRT. */
  precio: string;
  /** Folio de inscripción de la tarifa en el Registro Público de Concesiones. */
  folioTarifa: string;
  /** Tecnología del plan, si aplica (p. ej. "Fibra óptica"). */
  tecnologia?: string;
  caracteristicas: string[];
  destacado?: boolean;
}

/** Planes vigentes. Vacío hasta tener precios y folios inscritos. */
export const PLANES: Plan[] = [];

/** Costo único de instalación o contratación. */
export const COSTO_INSTALACION = 'PENDIENTE';

export interface ZonaCobertura {
  nombre: string;
  tecnologia?: string;
}

/** Localidades con cobertura. Vacío hasta tener las ubicaciones reales. */
export const ZONAS_COBERTURA: ZonaCobertura[] = [];

/** Formas de pago aceptadas, según el catálogo de trámites registrado. */
export const FORMAS_DE_PAGO: { titulo: string; detalle: string }[] = [];

/** Datos bancarios para transferencias. NUNCA poner valores de ejemplo. */
export const BANCO = 'PENDIENTE';
export const CUENTA_BANCARIA = 'PENDIENTE';
export const CLABE = 'PENDIENTE';
export const BENEFICIARIO = 'PENDIENTE';

export interface DocumentoOficial {
  titulo: string;
  descripcion: string;
  /**
   * Ruta del PDF dentro de public/, p. ej. "/legal/aviso-de-privacidad.pdf".
   * null mientras el documento no se haya publicado: el sitio muestra el
   * aviso de "pendiente" en lugar de un enlace roto.
   */
  archivo: string | null;
}

/** Documentos que el sitio debe publicar. Se llena conforme lleguen los PDF. */
export const DOCUMENTOS = {
  autorizacion: {
    titulo: 'Constancia de inscripción del título de autorización',
    descripcion: 'Inscripción en el Registro Público de Concesiones de la CRT.',
    archivo: null,
  },
  contratoAdhesion: {
    titulo: 'Contrato de adhesión',
    descripcion: 'Modelo de contrato registrado ante PROFECO.',
    archivo: null,
  },
  avisoPrivacidad: {
    titulo: 'Aviso de privacidad',
    descripcion: 'Qué datos personales recabamos, para qué y cómo ejercer tus derechos ARCO.',
    archivo: null,
  },
  cartaDerechos: {
    titulo: 'Carta de derechos mínimos de los usuarios',
    descripcion: 'Derechos que te asisten como usuario de servicios de telecomunicaciones.',
    archivo: null,
  },
  codigoPracticasComerciales: {
    titulo: 'Código de prácticas comerciales',
    descripcion: 'Cómo ofrecemos, contratamos, facturamos y damos soporte al servicio.',
    archivo: null,
  },
  codigoGestionRed: {
    titulo: 'Código de políticas de gestión de red',
    descripcion: 'Políticas de gestión de tráfico y neutralidad de la red.',
    archivo: null,
  },
  catalogoTramites: {
    titulo: 'Catálogo de trámites',
    descripcion: 'Trámites disponibles para clientes y cómo realizarlos.',
    archivo: null,
  },
  mediosPago: {
    titulo: 'Medios de pago',
    descripcion: 'Formas aceptadas para pagar el servicio.',
    archivo: null,
  },
  equiposTerminales: {
    titulo: 'Información de equipos terminales',
    descripcion: 'Equipos que se instalan y sus características.',
    archivo: null,
  },
  foliosTarifas: {
    titulo: 'Precios, tarifas y folios',
    descripcion: 'Tarifas vigentes con su folio de inscripción ante la CRT.',
    archivo: null,
  },
  procedimientoContratacion: {
    titulo: 'Procedimiento de contratación',
    descripcion: 'Pasos para contratar el servicio.',
    archivo: null,
  },
  procedimientoQuejas: {
    titulo: 'Procedimiento de quejas',
    descripcion: 'Cómo presentar una queja y los plazos de atención.',
    archivo: null,
  },
  mapasCobertura: {
    titulo: 'Mapas de cobertura',
    descripcion: 'Zonas donde se presta el servicio.',
    archivo: null,
  },
  terminosCondiciones: {
    titulo: 'Términos y condiciones',
    descripcion: 'Condiciones de uso del sitio y del servicio.',
    archivo: null,
  },
  codigoEtica: {
    titulo: 'Código de ética',
    descripcion: 'Valores y principios que guían nuestra operación.',
    archivo: null,
  },
  codigoEticaComercioElectronico: {
    titulo: 'Código de ética de comercio electrónico',
    descripcion: 'Compromisos en las operaciones realizadas por medios electrónicos.',
    archivo: null,
  },
} satisfies Record<string, DocumentoOficial>;

export type ClaveDocumento = keyof typeof DOCUMENTOS;

/* -------------------------------------------------------------------------- */
/* Utilidades para datos pendientes                                            */
/* -------------------------------------------------------------------------- */

/** true si el dato todavía no se ha proporcionado. */
export const esPendiente = (valor: string | null | undefined): boolean =>
  !valor || valor.toUpperCase().includes('PENDIENTE');

/** Enlace tel:, o null si el teléfono está pendiente. */
export const telefonoHref = (): string | null => {
  if (esPendiente(TELEFONO)) return null;
  const digitos = TELEFONO.replace(/\D/g, '');
  return `tel:+${digitos.length === 10 ? `52${digitos}` : digitos}`;
};

/**
 * Enlace de WhatsApp con mensaje prellenado. Si el número está pendiente
 * devuelve la sección de contacto, para que ningún botón quede muerto.
 */
export const whatsappHref = (mensaje?: string): string => {
  if (esPendiente(WHATSAPP)) return '/#contacto';
  const texto = mensaje ? `?text=${encodeURIComponent(mensaje)}` : '';
  return `https://wa.me/${WHATSAPP.replace(/\D/g, '')}${texto}`;
};

/** true si whatsappHref apunta a WhatsApp de verdad. */
export const whatsappDisponible = (): boolean => !esPendiente(WHATSAPP);

/** Enlace mailto:, o null si el correo está pendiente. */
export const correoHref = (correo: string, asunto?: string): string | null => {
  if (esPendiente(correo)) return null;
  return asunto ? `mailto:${correo}?subject=${encodeURIComponent(asunto)}` : `mailto:${correo}`;
};
