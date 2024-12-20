import {
  expectedPartOneSampleOutput,
  expectedPartTwoSampleOutput,
  solvePartOne,
  solvePartTwo,
} from './day-9/solution.ts';

const day = 9;

const dataPartOne = await Deno.readTextFile(
  `./day-${day}/input-sample-part-1.txt`,
);
const inputPartOne = dataPartOne.trim();
const samplePartOneOutput = solvePartOne(inputPartOne);
console.log(
  'Sample Part One (Expected):',
  expectedPartOneSampleOutput,
  '\nSample Part One (Actual):',
  samplePartOneOutput,
);

const dataPartTwo = await Deno.readTextFile(
  `./day-${day}/input-sample-part-2.txt`,
);
const inputPartTwo = dataPartTwo.trim();
const samplePartTwoOutput = solvePartTwo(inputPartTwo);
console.log(
  'Sample Part Two (Expected):',
  expectedPartTwoSampleOutput,
  '\nSample Part Two (Actual):',
  samplePartTwoOutput,
);

const data = await Deno.readTextFile(`./day-${day}/input.txt`);
const input = data.trim();

if (samplePartOneOutput === expectedPartOneSampleOutput) {
  console.log('\nPart One:', solvePartOne(input));
}
if (
  samplePartOneOutput === expectedPartOneSampleOutput &&
  samplePartTwoOutput === samplePartTwoOutput
) {
  console.log('Part Two:', solvePartTwo(input));
}
