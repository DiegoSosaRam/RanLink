// Genera los logos web (public/brand/) y los íconos (app/icon.png, app/apple-icon.png)
// a partir del logo claro original. Uso, desde ranlink-web/: node marca/generar-logos.cjs
const sharp = require('sharp');
const SRC = 'marca/originales/logo-claro-original.png';
const W = 1600;

// Quita el fondo blanco: cada pixel se interpreta como color sobre blanco con alfa.
function unwhite(data) {
  const out = Buffer.alloc((data.length / 3) * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    let a = (255 - Math.min(r, g, b)) / 255;
    a = Math.max(0, Math.min(1, (a - 0.03) / 0.97)); // limpia el ruido del fondo
    if (a === 0) { out[j + 3] = 0; continue; }
    out[j] = Math.max(0, Math.min(255, Math.round((r - (1 - a) * 255) / a)));
    out[j + 1] = Math.max(0, Math.min(255, Math.round((g - (1 - a) * 255) / a)));
    out[j + 2] = Math.max(0, Math.min(255, Math.round((b - (1 - a) * 255) / a)));
    out[j + 3] = Math.round(a * 255);
  }
  return out;
}

(async () => {
  const { data, info } = await sharp(SRC).resize(W).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const rgba = unwhite(data);
  const raw = { raw: { width: info.width, height: info.height, channels: 4 } };

  // Versión para tema claro: colores originales.
  const claro = await sharp(Buffer.from(rgba), raw).trim({ threshold: 1 }).png().toBuffer();
  await sharp(claro).resize(900).webp({ quality: 90, alphaQuality: 100 }).toFile('public/brand/logo-claro.webp');

  // Versión para tema oscuro: el marino del texto (RANLINK y razón social) pasa a casi blanco.
  const oscuro = Buffer.from(rgba);
  for (let j = 0; j < oscuro.length; j += 4) {
    if (oscuro[j + 3] === 0) continue;
    const mx = Math.max(oscuro[j], oscuro[j + 1], oscuro[j + 2]);
    if (mx < 140) { oscuro[j] = 241; oscuro[j + 1] = 245; oscuro[j + 2] = 251; }
  }
  const osc = await sharp(oscuro, raw).trim({ threshold: 1 }).png().toBuffer();
  await sharp(osc).resize(900).webp({ quality: 90, alphaQuality: 100 }).toFile('public/brand/logo-oscuro.webp');

  // Isotipo (solo el símbolo) para favicon e ícono de Apple.
  const k = W / 2000;
  const mark = await sharp(Buffer.from(rgba), raw)
    .extract({ left: Math.round(380 * k), top: Math.round(240 * k), width: Math.round(1200 * k), height: Math.round(880 * k) })
    .png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).png().toBuffer());
  const sq = async (size, pad, bg) => {
    const inner = Math.round(size * (1 - pad * 2));
    const m = await sharp(mark).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background: bg } }).composite([{ input: m }]).png();
  };
  await (await sq(512, 0.04, { r: 0, g: 0, b: 0, alpha: 0 })).toFile('app/icon.png');
  await (await sq(180, 0.14, { r: 6, g: 12, b: 28, alpha: 1 })).toFile('app/apple-icon.png');
  await sharp(mark).resize(400).webp({ quality: 90, alphaQuality: 100 }).toFile('public/brand/isotipo.webp');
  console.log('ok');
})();
