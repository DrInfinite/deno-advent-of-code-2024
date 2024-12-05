export const expectedPartOneSampleOutput = '2';

const isIncreasing = (arr: number[]): boolean => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
};

const isDecreasing = (arr: number[]): boolean => {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) return false;
  }
  return true;
};

const checkSafe = (arr: number[]): boolean => {
  for (let index = 0; index < arr.length; index++) {
    if (index > arr.length) return false;
    if (Math.abs(arr[index] - arr[index + 1]) > 3) return false;
    if (arr[index] - arr[index + 1] === 0) return false;
    if (!isIncreasing(arr)) if (!isDecreasing(arr)) return false;
  }

  return true;
};

export function solvePartOne(input: string): string {
  const lines = input.split('\n').map((line) => line.split(' ').map(Number));

  let safe = 0;
  lines.forEach((line) => (checkSafe(line) ? safe++ : null));

  return safe.toString();
}

export const expectedPartTwoSampleOutput = '4';

export function solvePartTwo(input: string): string {
  const lines = input.split('\n').map((line) => line.split(' ').map(Number));

  let safe = 0;
  for (const line of lines) {
    if (checkSafe(line)) {
      safe++;
    } else {
      for (let i = 0; i < line.length; i++) {
        const newLine = line.slice(0, i).concat(line.slice(i + 1));

        if (checkSafe(newLine)) {
          safe++;
          break;
        }
      }
    }
  }

  return safe.toString();
}
