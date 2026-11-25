import { Fraction, gcd } from './fraction.js';

const ri = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));

// ---------- Grade 1 ----------

export function addWithin20(rng = Math.random) {
  const a = ri(rng, 2, 9);
  const b = ri(rng, 2, Math.min(11, 20 - a));
  const sum = a + b;
  const steps = [`We need to find ${a} + ${b}.`];

  if (sum <= 10) {
    steps.push(`Count on from ${a}: ${a} + ${b} lands on ${sum}.`);
  } else if (b < 10) {
    const toTen = 10 - a;
    steps.push(`Break ${b} into ${toTen} + ${b - toTen} so we can make 10.`);
    steps.push(`${a} + ${toTen} = 10, then 10 + ${b - toTen} = ${sum}.`);
  } else {
    const rest = b - 10;
    steps.push(`Add 10 to ${a} first: ${a} + 10 = ${a + 10}.`);
    if (rest > 0) steps.push(`Then add the rest: ${a + 10} + ${rest} = ${sum}.`);
  }

  steps.push(`So ${a} + ${b} = ${sum}.`);
  return { prompt: `${a} + ${b}`, answer: new Fraction(sum), steps };
}

export function subWithin20(rng = Math.random) {
  const a = ri(rng, 6, 20);
  const b = ri(rng, 2, Math.min(a - 1, 10));
  const diff = a - b;
  const ones = a % 10;
  const steps = [`We need to find ${a} − ${b}.`];

  if (ones === 0 && b === 10) {
    steps.push(`Subtract one ten: ${a} − 10 = ${diff}.`);
  } else if (ones === 0) {
    steps.push(`Start at ${a} and count back ${b}: ${a} → ${diff}.`);
  } else if (ones >= b) {
    steps.push(`Take ${b} from the ${ones} ones: ${ones} − ${b} = ${ones - b}.`);
    steps.push(`The tens stay the same, so ${a} − ${b} = ${diff}.`);
  } else {
    const rest = b - ones;
    steps.push(`First subtract ${ones} to reach 10: ${a} − ${ones} = 10.`);
    steps.push(`Then subtract the rest: 10 − ${rest} = ${diff}.`);
  }

  steps.push(`So ${a} − ${b} = ${diff}.`);
  return { prompt: `${a} − ${b}`, answer: new Fraction(diff), steps };
}

// ---------- Grade 2 ----------

export function addWithin100(rng = Math.random) {
  const a = ri(rng, 10, 89);
  const b = ri(rng, 2, 99 - a);
  const sum = a + b;
  const aOnes = a % 10;
  const bOnes = b % 10;
  const aTens = Math.floor(a / 10);
  const bTens = Math.floor(b / 10);
  const steps = [`We need to find ${a} + ${b}.`];

  if (aOnes + bOnes >= 10) {
    steps.push(`Add the ones: ${aOnes} + ${bOnes} = ${aOnes + bOnes}, which is more than 9 — carry 1 ten.`);
    steps.push(`Ones digit: ${aOnes + bOnes - 10}, carry 1.`);
    steps.push(`Add the tens including the carry: ${aTens} + ${bTens} + 1 = ${aTens + bTens + 1}.`);
  } else {
    steps.push(`Add the ones: ${aOnes} + ${bOnes} = ${aOnes + bOnes}.`);
    steps.push(`Add the tens: ${aTens} + ${bTens} = ${aTens + bTens}.`);
  }

  steps.push(`So ${a} + ${b} = ${sum}.`);
  return { prompt: `${a} + ${b}`, answer: new Fraction(sum), steps };
}

export function multFactsTo5(rng = Math.random) {
  const a = ri(rng, 1, 5);
  const b = ri(rng, 1, 5);
  const product = a * b;
  const steps = [`We need to find ${a} × ${b}, which means ${a} groups of ${b}.`];

  if (a === 1 || b === 1) {
    steps.push(`Multiplying by 1 doesn't change the number.`);
  } else {
    steps.push(`Add ${a} copies of ${b}: ${Array(a).fill(b).join(' + ')} = ${product}.`);
  }

  steps.push(`So ${a} × ${b} = ${product}.`);
  return { prompt: `${a} × ${b}`, answer: new Fraction(product), steps };
}

// ---------- Grade 3 ----------

export function multFactsTo10(rng = Math.random) {
  const a = ri(rng, 2, 10);
  const b = ri(rng, 2, 10);
  const product = a * b;

  if (rng() < 0.5) {
    return {
      prompt: `${product} ÷ ${a}`,
      answer: new Fraction(b),
      steps: [
        `We need to find ${product} ÷ ${a} — how many ${a}s fit into ${product}?`,
        `Since ${a} × ${b} = ${product}, the answer is ${b}.`,
      ],
    };
  }

  const steps = [`We need to find ${a} × ${b}.`];
  if (a === 10 || b === 10) {
    const other = a === 10 ? b : a;
    steps.push(`Multiplying by 10: append a zero — ${other} × 10 = ${other}0.`);
  } else if (a === 5 || b === 5) {
    const other = a === 5 ? b : a;
    steps.push(`${other} × 5 is half of ${other} × 10 = ${other * 10}, so ${other * 5}.`);
  } else if (a === 2 || b === 2) {
    const other = a === 2 ? b : a;
    steps.push(`Doubling: ${other} + ${other} = ${other * 2}.`);
  } else if (a === 9 || b === 9) {
    const other = a === 9 ? b : a;
    steps.push(`${other} × 9 = ${other} × 10 − ${other} = ${other * 10} − ${other} = ${other * 9}.`);
  } else if (a === 4 || b === 4) {
    const other = a === 4 ? b : a;
    steps.push(`Double twice: ${other} × 2 = ${other * 2}, then ${other * 2} × 2 = ${other * 4}.`);
  } else {
    steps.push(`${a} groups of ${b} make ${product}.`);
  }

  steps.push(`So ${a} × ${b} = ${product}.`);
  return { prompt: `${a} × ${b}`, answer: new Fraction(product), steps };
}

export function areaPerimeter(rng = Math.random) {
  const length = ri(rng, 3, 12);
  const width = ri(rng, 2, 10);

  if (rng() < 0.6) {
    return {
      prompt: `A rectangle is ${length} cm long and ${width} cm wide. What is its area in square cm?`,
      hint: 'Area in square cm',
      answer: new Fraction(length * width),
      steps: [
        `Area of a rectangle = length × width.`,
        `${length} × ${width} = ${length * width}.`,
        `So the area is ${length * width} square cm.`,
      ],
    };
  }

  return {
    prompt: `A rectangle is ${length} cm long and ${width} cm wide. What is its perimeter in cm?`,
    hint: 'Perimeter in cm',
    answer: new Fraction(2 * (length + width)),
    steps: [
      `Perimeter = 2 × (length + width).`,
      `${length} + ${width} = ${length + width}.`,
      `2 × ${length + width} = ${2 * (length + width)}.`,
      `So the perimeter is ${2 * (length + width)} cm.`,
    ],
  };
}

// ---------- Grade 4 ----------

export function multTwoDigitByOne(rng = Math.random) {
  const a = ri(rng, 11, 99);
  const b = ri(rng, 2, 9);
  const tens = Math.floor(a / 10) * 10;
  const ones = a % 10;
  const product = a * b;

  return {
    prompt: `${a} × ${b}`,
    answer: new Fraction(product),
    steps: [
      `We need to find ${a} × ${b}.`,
      `Break ${a} into ${tens} + ${ones}.`,
      `${tens} × ${b} = ${tens * b}.`,
      `${ones} × ${b} = ${ones * b}.`,
      `${tens * b} + ${ones * b} = ${product}.`,
      `So ${a} × ${b} = ${product}.`,
    ],
  };
}

export function addLikeFractions(rng = Math.random) {
  const d = ri(rng, 3, 10);
  const a = ri(rng, 1, d - 1);
  const b = ri(rng, 1, d - a);
  const rawNum = a + b;
  const sum = new Fraction(rawNum, d);

  const steps = [
    `We need to find ${a}/${d} + ${b}/${d}.`,
    `The denominators match (${d}), so add the numerators: ${a} + ${b} = ${rawNum}.`,
    `That gives ${rawNum}/${d}.`,
  ];
  if (sum.d !== d) steps.push(`Simplify: ${rawNum}/${d} = ${sum}.`);
  if (sum.d === 1) steps.push(`And ${sum} is a whole number.`);
  steps.push(`So ${a}/${d} + ${b}/${d} = ${sum}.`);

  return { prompt: `${a}/${d} + ${b}/${d}`, answer: sum, steps };
}

// ---------- Grade 5 ----------

export function addUnlikeFractions(rng = Math.random) {
  const d1 = ri(rng, 2, 6);
  let d2;
  do { d2 = ri(rng, 2, 6); } while (d2 === d1);

  const a = ri(rng, 1, d1 - 1);
  const b = ri(rng, 1, d2 - 1);

  const lcd = (d1 * d2) / gcd(d1, d2);
  const a2 = a * (lcd / d1);
  const b2 = b * (lcd / d2);
  const sum = new Fraction(a2 + b2, lcd);

  const steps = [
    `We need to find ${a}/${d1} + ${b}/${d2}.`,
    `Find a common denominator. The least common multiple of ${d1} and ${d2} is ${lcd}.`,
    `Rewrite each fraction: ${a}/${d1} = ${a2}/${lcd} and ${b}/${d2} = ${b2}/${lcd}.`,
    `Add the numerators: ${a2} + ${b2} = ${a2 + b2}.`,
    `That gives ${a2 + b2}/${lcd}${sum.d === lcd ? '' : ` = ${sum}`}.`,
  ];
  if (sum.d === 1) steps.push(`And ${sum} is a whole number.`);
  steps.push(`So ${a}/${d1} + ${b}/${d2} = ${sum}.`);

  return { prompt: `${a}/${d1} + ${b}/${d2}`, answer: sum, steps };
}

export function orderOfOperations(rng = Math.random) {
  const a = ri(rng, 2, 10);
  const b = ri(rng, 2, 9);
  const c = ri(rng, 2, 9);
  const product = b * c;
  const total = a + product;

  return {
    prompt: `${a} + ${b} × ${c}`,
    answer: new Fraction(total),
    steps: [
      `We need to find ${a} + ${b} × ${c}.`,
      `Multiplication comes before addition, so do ${b} × ${c} first.`,
      `${b} × ${c} = ${product}.`,
      `Then add: ${a} + ${product} = ${total}.`,
      `So ${a} + ${b} × ${c} = ${total}.`,
    ],
  };
}

// ---------- Registry ----------

const GENERATORS = {
  1: [addWithin20, subWithin20],
  2: [addWithin100, multFactsTo5],
  3: [multFactsTo10, areaPerimeter],
  4: [multTwoDigitByOne, addLikeFractions],
  5: [addUnlikeFractions, orderOfOperations],
};

export function generateProblem(grade, rng = Math.random) {
  if (grade === 'mixed') {
    const g = ri(rng, 1, 5);
    return generateProblem(g, rng);
  }
  const gens = GENERATORS[grade];
  return gens[Math.floor(rng() * gens.length)](rng);
}
