import { solvePartOne, solvePartTwo } from './day-4/solution.ts';

const data = await Deno.readTextFile('./day-4/input.txt');
const input = data.trim();

console.log('Part One:', solvePartOne(input));
console.log('Part Two:', solvePartTwo(input));
