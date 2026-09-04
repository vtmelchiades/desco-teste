const BASE = "https://static.wixstatic.com/media/";

/** Imagem cortada (cover) nas dimensões pedidas. */
export function wixFill(id: string, w: number, h: number, q = 85) {
  return `${BASE}${id}/v1/fill/w_${w},h_${h},al_c,q_${q},enc_auto/${id}`;
}

/** Imagem contida (sem corte) até as dimensões pedidas. */
export function wixFit(id: string, w: number, h: number, q = 85) {
  return `${BASE}${id}/v1/fit/w_${w},h_${h},q_${q},enc_auto/${id}`;
}

export function wixRaw(id: string) {
  return `${BASE}${id}`;
}

/** Limita a textura a um tamanho razoável mantendo a proporção. */
export function fitTexture(w: number, h: number, max = 1600) {
  if (w <= max) return { w, h };
  const f = max / w;
  return { w: Math.round(w * f), h: Math.round(h * f) };
}

export function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
