export const expectedPartOneSampleOutput = '143';

function validateAndSumMiddlePages(
  rules: string[],
  updates: number[][],
): number {
  const dependencies: Map<number, Set<number>> = new Map();

  rules.forEach((rule) => {
    const [a, b] = rule.split('|').map(Number);
    if (!dependencies.has(b)) dependencies.set(b, new Set());
    dependencies.get(b)!.add(a);
  });

  let sum = 0;

  updates.forEach((update) => {
    if (isValidOrder(update, dependencies)) {
      const middle = Math.floor(update.length / 2);
      sum += update[middle];
    }
  });

  return sum;
}

export function solvePartOne(input: string): string {
  const lines = input.split('\n');

  const rules = lines.splice(0, lines.indexOf(''));

  const updates = lines
    .splice(lines.indexOf(''))
    .filter((line) => line !== '')
    .map((line) => line.split(',').map(Number));

  return validateAndSumMiddlePages(rules, updates).toString();
}

export const expectedPartTwoSampleOutput = '123';

function fixAndSumMiddlePages(rules: string[], updates: number[][]): number {
  const dependencies: Map<number, Set<number>> = new Map();

  rules.forEach((rule) => {
    const [a, b] = rule.split('|').map(Number);
    if (!dependencies.has(b)) dependencies.set(b, new Set());
    dependencies.get(b)!.add(a);
  });

  let sum = 0;

  updates.forEach((update) => {
    if (!isValidOrder(update, dependencies)) {
      const sorted = sortUpdate(update, dependencies);
      const middle = Math.floor(sorted.length / 2);
      sum += sorted[middle];
    }
  });

  return sum;
}

export function solvePartTwo(input: string): string {
  const lines = input.split('\n');

  const rules = lines.splice(0, lines.indexOf(''));

  const updates = lines
    .splice(lines.indexOf(''))
    .filter((line) => line !== '')
    .map((line) => line.split(',').map(Number));

  return fixAndSumMiddlePages(rules, updates).toString();
}

/***** Helpers *****/
function isValidOrder(
  update: number[],
  dependencies: Map<number, Set<number>>,
): boolean {
  const position: Map<number, number> = new Map();
  update.forEach((page, idx) => position.set(page, idx));

  for (const [page, prereqs] of dependencies.entries()) {
    if (!position.has(page)) {
      continue;
    }
    for (const prereq of prereqs) {
      if (position.has(prereq) && position.get(prereq)! > position.get(page)!) {
        return false;
      }
    }
  }

  return true;
}

function sortUpdate(
  update: number[],
  dependencies: Map<number, Set<number>>,
): number[] {
  const sortedUpdate = [...update];
  sortedUpdate.sort((a, b) => {
    if (dependencies.has(b) && dependencies.get(b)!.has(a)) return -1;
    if (dependencies.has(a) && dependencies.get(a)!.has(b)) return 1;
    return 0;
  });
  return sortedUpdate;
}
