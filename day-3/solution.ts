export const expectedPartOneSampleOutput = '161';

export function solvePartOne(input: string): string {
  return input
    .split('\n')
    .map(
      (line) =>
        line
          .match(/mul\((\d+),(\d+)\)/gi)
          ?.map(
            (line) =>
              line
                .match(/\d+/gi)
                ?.map(Number)
                .reduce((acc, curr) => (acc *= curr)),
          )
          .filter((value) => value !== undefined)
          .reduce((acc, curr) => (acc += curr)),
    )
    .filter((value) => value !== undefined)
    .reduce((acc, curr) => (acc += curr))
    ?.toString() as string;
}

export const expectedPartTwoSampleOutput = '48';

export function solvePartTwo(input: string): string {
  return input
    .split('\n')
    .map(
      (line) =>
        line.match(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/gi) as RegExpMatchArray,
    )
    .toString()
    .replace(/\),/gi, ')')
    .replace(/don't\(\)(.*?)do\(\)/gi, '.')
    .replace(/do\(\)/gi, '.')
    .split('.')
    .slice(1)
    .map(
      (line) =>
        line
          .match(/mul\((\d+),(\d+)\)/gi)
          ?.map(
            (value) =>
              value
                .match(/\d+/gi)
                ?.map(Number)
                .reduce((acc, curr) => acc * curr),
          )
          .filter((value) => value !== undefined)
          .reduce((acc, curr) => (acc += curr)),
    )
    .filter((value) => value !== undefined)
    .reduce((acc, curr) => (acc += curr))
    ?.toString() as string;
}
