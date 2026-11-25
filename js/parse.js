import { Fraction } from './fraction.js';

/**
 * Accepts: "12", "-3/4", "0.75", ".5", "1 1/2", "1  1/2" (with any whitespace).
 * Returns Fraction or null.
 */
export function parseAnswer(input) {
  if (input == null) return null;
  const str = String(input).trim();
  if (!str) return null;

  // Mixed number: "1 1/2"
  const mixed = str.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const whole = parseInt(mixed[1], 10);
    const num = parseInt(mixed[2], 10);
    const den = parseInt(mixed[3], 10);
    if (den === 0) return null;
    const sign = whole < 0 ? -1 : 1;
    return new Fraction(sign * (Math.abs(whole) * den + num), den);
  }

  // Strip spaces for the remaining forms.
  const t = str.replace(/\s+/g, '');

  // Fraction: "3/4"
  const frac = t.match(/^(-?\d+)\/(-?\d+)$/);
  if (frac) {
    const num = parseInt(frac[1], 10);
    const den = parseInt(frac[2], 10);
    if (den === 0) return null;
    return new Fraction(num, den);
  }

  // Decimal: "0.75", ".5", "-1.25"
  const dec = t.match(/^(-?)(\d*)\.(\d+)$/);
  if (dec) {
    const sign = dec[1] === '-' ? -1 : 1;
    const wholeStr = dec[2] || '0';
    const fracStr = dec[3];
    const den = Math.pow(10, fracStr.length);
    const num = parseInt(wholeStr + fracStr, 10);
    return new Fraction(sign * num, den);
  }

  // Integer
  if (/^-?\d+$/.test(t)) return new Fraction(parseInt(t, 10));

  return null;
}
