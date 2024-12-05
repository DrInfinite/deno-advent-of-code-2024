export const expectedPartOneSampleOutput = '18';

export function solvePartOne(input: string): string {
  const lines = input.split('\n').filter((line) => line !== '');
  const directions: [number, number][] = [];

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      if (x !== 0 || y !== 0) {
        directions.push([x, y]);
      }
    }
  }

  const rows = lines.length;
  const cols = lines[0].length;
  const word = 'XMAS';
  const length = word.length;
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      directions.forEach(([dx, dy]) => {
        const endR = row + dx * (length - 1);
        const endC = col + dy * (length - 1);

        if (endR >= 0 && endR < rows && endC >= 0 && endC < cols) {
          let match = true;
          word.split('').forEach((_, index) => {
            const nr = row + dx * index;
            const nc = col + dy * index;

            if (lines[nr][nc] !== word[index]) {
              match = false;
            }
          });

          if (match) {
            count += 1;
          }
        }
      });
    }
  }

  return count.toString();
}

export const expectedPartTwoSampleOutput = '9';

export function solvePartTwo(input: string): string {
  const lines = input.split('\n').map((line) => line.split(''));

  const cols = lines[0].length;
  const rows = lines.length;
  let count = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const letter = lines[row][col];

      if (letter !== 'A') continue;

      if (row === 0 || row === rows - 1 || col === 0 || col === cols - 1)
        continue;

      const corners = [
        lines[row - 1][col - 1],
        lines[row - 1][col + 1],
        lines[row + 1][col + 1],
        lines[row + 1][col - 1],
      ].filter((corner) => corner !== 'X' && corner !== 'A');

      if (corners.length !== 4) continue;

      if (corners[0] === corners[2]) continue;

      if (corners[1] === corners[3]) continue;

      count++;
    }
  }

  return count.toString();
}
