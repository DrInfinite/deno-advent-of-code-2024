export const expectedPartOneSampleOutput = 11;

export function solvePartOne(input: string): number {
  const lines: string[] = input.split('\n');

  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line) => {
    const [l, r] = line.split('   ');

    left.push(parseInt(l));
    right.push(parseInt(r));
  });

  left.sort();
  right.sort();

  let totalDistance: number = 0;
  for (let i = 0; i < lines.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }

  return totalDistance;
}

export const expectedPartTwoSampleOutput = 31;

export function solvePartTwo(input: string): number {
  const lines: string[] = input.split('\n');

  const left: number[] = [];
  const right: number[] = [];

  lines.forEach((line) => {
    const [l, r] = line.split('   ');

    left.push(parseInt(l));
    right.push(parseInt(r));
  });

  function countElements(arr: number[]) {
    const counts: { [key: string]: number } = {};

    for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    return counts;
  }

  let similarityScore: number = 0;
  const count = countElements(right);
  for (let i = 0; i < lines.length; i++) {
    similarityScore += left[i] * (count[left[i]] ? count[left[i]] : 0);
  }

  return similarityScore;
}
