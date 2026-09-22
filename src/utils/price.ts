/** Convierte textos como "$29.99" o "Item total: $39.98" en número. */
export function parsePrice(text: string): number {
  const match = text.match(/\$(\d+(?:\.\d{1,2})?)/);
  if (!match) throw new Error(`No se encontró un precio en: "${text}"`);
  return Number(match[1]);
}

/** Redondea a 2 decimales para comparar montos sin errores de punto flotante. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function sum(values: number[]): number {
  return round2(values.reduce((acc, v) => acc + v, 0));
}
