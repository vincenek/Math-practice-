export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

export class Fraction {
  constructor(num, den = 1) {
    if (den === 0) throw new Error("Zero denominator");
    if (den < 0) { num = -num; den = -den; }
    const g = gcd(num, den) || 1;
    this.n = num / g;
    this.d = den / g;
  }

  equals(other) {
    return this.n * other.d === other.n * this.d;
  }

  toString() {
    return this.d === 1 ? `${this.n}` : `${this.n}/${this.d}`;
  }
}
