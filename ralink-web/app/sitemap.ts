import type { MetadataRoute } from "next";
import { SITIO_URL } from "./lib/constants";

export const dynamic = "force-static";

/** Al agregar una ruta nueva, añádela también aquí. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITIO_URL}/`, lastModified: new Date() }];
}
