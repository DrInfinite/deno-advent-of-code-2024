export const expectedPartOneSampleOutput = '3749';

export function solvePartOne(input: string): string {
  const lines = input.split('\n');

  let sum = 0;

  lines.forEach((line) => {
    const equation = line.split(': ');

    const desired = parseInt(equation[0], 10);
    const values = equation
      .at(1)
      .split(' ')
      .map((value) => parseInt(value, 10));

    let totals = [values[0]];

    for (let i = 1; i < values.length; i++) {
      const next = values[i];
      totals = totals.flatMap((total) => {
        return [next + total, next * total];
      });
    }

    if (totals.includes(desired)) {
      sum += desired;
    }
  });

  return sum.toString();
}

export const expectedPartTwoSampleOutput = '11387';

export function solvePartTwo(input: string): string {
  const lines = input.split('\n');

  let sum = 0;

  lines.forEach((line) => {
    const equation = line.split(': ');

    const desired = parseInt(equation[0], 10);
    const values = equation
      .at(1)
      .split(' ')
      .map((value) => parseInt(value, 10));

    let totals = [values[0]];

    for (let i = 1; i < values.length; i++) {
      const next = values[i];
      totals = totals.flatMap((total) => {
        return [next + total, next * total, parseInt(`${total}${next}`, 10)];
      });
    }

    if (totals.includes(desired)) {
      sum += desired;
    }
  });

  return sum.toString();
}
