export const expectedPartOneSampleOutput = '14';

export function solvePartOne(input: string): string {
  const lines = input.split('\n').map((line) => line.split(''));
  const positionsByFrequency: {
    [frequency: string]: { x: number; y: number }[];
  } = {};

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];

      if (char === '.') {
        continue;
      }

      if (!positionsByFrequency[char]) {
        positionsByFrequency[char] = [];
      }

      positionsByFrequency[char].push({ x, y });
    }
  }

  const frequencies = Object.keys(positionsByFrequency);
  const locations: { x: number; y: number }[] = [];

  frequencies.forEach((frequency) => {
    const positions = positionsByFrequency[frequency];

    const pairs: [{ x: number; y: number }, { x: number; y: number }][] = [];

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        pairs.push([positions[i], positions[j]]);
      }
    }

    pairs.forEach((pair) => {
      const [first, second] = pair;

      const dx = first.x - second.x;
      const dy = first.y - second.y;

      const above = { x: first.x + dx, y: first.y + dy };
      const below = { x: second.x - dx, y: second.y - dy };

      for (const position of [above, below]) {
        if (
          position.x >= 0 && position.x < lines[0].length && position.y >= 0 &&
          position.y < lines.length
        ) {
          if (
            !locations.some((location) =>
              location.x === position.x && location.y === position.y
            )
          ) {
            locations.push(position);
          }
        }
      }
    });
  });

  return locations.length.toString();
}

export const expectedPartTwoSampleOutput = '34';

export function solvePartTwo(input: string): string {
  const lines = input.split('\n').map((line) => line.split(''));
  const positionsByFrequency: {
    [frequency: string]: { x: number; y: number }[];
  } = {};

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x];

      if (char === '.') {
        continue;
      }

      if (!positionsByFrequency[char]) {
        positionsByFrequency[char] = [];
      }

      positionsByFrequency[char].push({ x, y });
    }
  }

  const frequencies = Object.keys(positionsByFrequency);
  const locations: { x: number; y: number }[] = [];

  frequencies.forEach((frequency) => {
    const positions = positionsByFrequency[frequency];

    const pairs: [{ x: number; y: number }, { x: number; y: number }][] = [];

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        pairs.push([positions[i], positions[j]]);
      }
    }

    pairs.forEach((pair) => {
      const [first, second] = pair;

      const dx = first.x - second.x;
      const dy = first.y - second.y;

      let multiplier = 0;

      while (true) {
        const nextAbove = {
          x: first.x + multiplier * dx,
          y: first.y + multiplier * dy,
        };
        const nextBelow = {
          x: first.x - multiplier * dx,
          y: first.y - multiplier * dy,
        };

        const valid: { x: number; y: number }[] = [];

        if (
          nextAbove.x >= 0 && nextAbove.x < lines[0].length &&
          nextAbove.y >= 0 && nextAbove.y < lines.length
        ) {
          valid.push(nextAbove);
        }

        if (
          nextBelow.x >= 0 && nextBelow.x < lines[0].length &&
          nextBelow.y >= 0 && nextBelow.y < lines.length
        ) {
          valid.push(nextBelow);
        }

        if (valid.length === 0) {
          break;
        }

        valid.forEach((next) => {
          if (
            !locations.some((location) =>
              location.x === next.x && location.y === next.y
            )
          ) {
            locations.push(next);
          }
        });

        multiplier++;
      }
    });
  });

  return locations.length.toString();
}
