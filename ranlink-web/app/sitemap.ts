import type { MetadataRoute } from "next";
import { SITIO_URL } from "./lib/constants";
import { RUTAS } from "./lib/rutas";

export const dynamic = "force-static";

/** Las rutas salen de app/lib/rutas.ts: al agregar una página, regístrala ahí. */
export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(RUTAS).map((ruta) => ({ url: `${SITIO_URL}${ruta}`, lastModified: new Date() }));
}
