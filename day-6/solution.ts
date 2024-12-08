const directions = ['^', '>', 'v', '<'];

export const expectedPartOneSampleOutput = '41';

function nextStep(input: string[][], visited: { row: number; col: number }[]) {
  const grid = input.map((row) => [...row]);
  let found: { row: number; col: number } | null = null;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      if (!directions.includes(cell)) {
        continue;
      }

      found = { row: i, col: j };
    }
  }

  if (!found) {
    return null;
  }

  if (
    !visited.some((index) => index.row === found.row && index.col === found.col)
  ) {
    visited.push(found);
  }

  if (grid[found.row][found.col] === '^') {
    if (found.row - 1 < 0) {
      return null;
    } else if (grid[found.row - 1][found.col] === '#') {
      grid[found.row][found.col + 1] = '>';
      grid[found.row][found.col] = '.';
    } else {
      grid[found.row - 1][found.col] = '^';
      grid[found.row][found.col] = '.';
    }
  } else if (grid[found.row][found.col] === '>') {
    if (found.col + 1 >= grid[found.row].length) {
      return null;
    } else if (grid[found.row][found.col + 1] === '#') {
      grid[found.row + 1][found.col] = 'v';
      grid[found.row][found.col] = '.';
    } else {
      grid[found.row][found.col + 1] = '>';
      grid[found.row][found.col] = '.';
    }
  } else if (grid[found.row][found.col] === 'v') {
    if (found.row + 1 >= grid.length) {
      return null;
    } else if (grid[found.row + 1][found.col] === '#') {
      grid[found.row][found.col - 1] = '<';
      grid[found.row][found.col] = '.';
    } else {
      grid[found.row + 1][found.col] = 'v';
      grid[found.row][found.col] = '.';
    }
  } else if (grid[found.row][found.col] === '<') {
    if (found.col - 1 < 0) {
      return null;
    } else if (grid[found.row][found.col - 1] === '#') {
      grid[found.row - 1][found.col] = '^';
      grid[found.row][found.col] = '.';
    } else {
      grid[found.row][found.col - 1] = '<';
      grid[found.row][found.col] = '.';
    }
  }

  return grid;
}

export function solvePartOne(input: string): string {
  const lines: string[] = input.split('\n').map((line) => line.trim());

  const grid: string[][] = [];
  const visited: { row: number; col: number }[] = [];

  lines.forEach((line) => {
    const row = line.split('');
    grid.push(row);
  });

  let current = grid;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const next = nextStep(current, visited);
    if (!next) {
      break;
    }
    current = next;
  }

  return visited.length.toString();
}

export const expectedPartTwoSampleOutput = '6';

function simulate(grid: string[][]) {
  const guard = indexOfGuard(grid);
  if (!guard) {
    return false;
  }

  const initialDirection = grid[guard.row][guard.col];
  let currentDirection = initialDirection;
  let currentColumn = guard.col;
  let currentRow = guard.row;
  const positions: { row: number; col: number; direction: string }[] = [];

  while (
    currentRow >= 0 &&
    currentRow < grid.length &&
    currentColumn >= 0 &&
    currentColumn < grid[currentRow].length
  ) {
    if (grid[currentRow][currentColumn] === '#') {
      if (currentDirection === '^') {
        currentDirection = '>';
        currentRow++;
      } else if (currentDirection === '>') {
        currentDirection = 'v';
        currentColumn--;
      } else if (currentDirection === 'v') {
        currentDirection = '<';
        currentRow--;
      } else if (currentDirection === '<') {
        currentDirection = '^';
        currentColumn++;
      }
      continue;
    }

    if (
      positions.some(
        (position) =>
          position.row === currentRow &&
          position.col === currentColumn &&
          position.direction === currentDirection,
      )
    ) {
      return true;
    }

    positions.push({
      row: currentRow,
      col: currentColumn,
      direction: currentDirection,
    });

    if (currentDirection === '^') {
      currentRow--;
    } else if (currentDirection === '>') {
      currentColumn++;
    } else if (currentDirection === 'v') {
      currentRow++;
    } else if (currentDirection === '<') {
      currentColumn--;
    }
  }

  return false;
}

export function solvePartTwo(input: string): string {
  const lines = input.split('\n').map((line) => line.trim());

  const grid: string[][] = [];

  for (const line of lines) {
    const row = line.split('');
    grid.push(row);
  }

  const positions: { row: number; col: number }[] = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== '.') {
        continue;
      }

      const newGrid = grid.map((row) => [...row]);
      newGrid[row][col] = '#';

      const result = simulate(newGrid);

      if (result) {
        if (
          !positions.some(
            (position) => position.row === row && position.col === col,
          )
        ) {
          positions.push({ row, col });
        }
      }
    }
  }

  return positions.length.toString();
}

/***** Helpers *****/
function indexOfGuard(grid: string[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      if (!directions.includes(cell)) {
        continue;
      }

      return { row: i, col: j };
    }
  }

  return null;
}
