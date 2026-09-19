/**
 * Datos oficiales de RaLink.
 *
 * Todo dato del negocio vive aquí y NUNCA se escribe directo en una página:
 * en el proyecto anterior llegaron a convivir tres domicilios distintos por
 * no centralizarlos.
 *
 * Los valores marcados como PENDIENTE deben sustituirse por los datos reales
 * antes de publicar. No los rellenes con valores inventados: un dato fiscal o
 * bancario con apariencia real puede provocar daños reales.
 */

export const NOMBRE_COMERCIAL = 'RaLink';

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

/** Constancia de inscripción en el Registro Público de Concesiones (CRT). */
export const AUTORIZACION_FOLIO = 'PENDIENTE';
export const AUTORIZACION_INSCRIPCION = 'PENDIENTE';
export const AUTORIZACION_FECHA = 'PENDIENTE';
export const AUTORIZACION_VIGENCIA = 'PENDIENTE';

/** Contrato de adhesión registrado ante PROFECO. */
export const CONTRATO_REGISTRO = 'PENDIENTE';
export const CONTRATO_REGISTRO_FECHA = 'PENDIENTE';
export const CONTRATO_OFICIO = 'PENDIENTE';
/** Copia local del contrato, una vez que se publique en public/legal/. */
export const CONTRATO_ADHESION_PDF = '/legal/contrato-adhesion.pdf';
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
