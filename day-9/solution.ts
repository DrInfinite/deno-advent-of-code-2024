export const expectedPartOneSampleOutput = '1928';

export function solvePartOne(input: string): string {
  const values = input.split('').map(Number);

  const fileSpaces: number[] = values.filter((_, index) => index % 2 === 0);
  const emptySpaces: number[] = values.filter((_, index) => index % 2 !== 0);

  const compacted: (number | 'empty')[] = [];

  fileSpaces.forEach((value, id) => {
    for (let count = 0; count < value; count++) {
      compacted.push(id);
    }

    const empty: number = emptySpaces[id];

    if (empty !== null) {
      for (let count = 0; count < empty; count++) {
        compacted.push('empty');
      }
    }
  });

  for (let i = compacted.length - 1; i >= 0; i--) {
    const value: number | 'empty' = compacted[i];

    if (value === 'empty') {
      continue;
    }

    compacted[i] = 'empty';

    const first: number = compacted.findIndex((value) => value === 'empty');
    compacted[first] = value;
  }

  let checkSum: number = 0;

  for (let i = 0; i < compacted.length; i++) {
    const value: number | 'empty' = compacted[i];

    if (value === 'empty') {
      continue;
    }

    checkSum += value * i;
  }

  return checkSum.toString();
}

export const expectedPartTwoSampleOutput = '2858';

export function solvePartTwo(input: string): string {
  const values = input.split('').map(Number);

  const fileSpaces = values.filter((value, index) => index % 2 === 0);
  const emptySpaces = values.filter((value, index) => index % 2 === 1);

  const compacted: { id: number | 'empty'; length: number }[] = [];

  for (let i = 0; i < fileSpaces.length; i++) {
    const value = fileSpaces[i];
    const id = i;

    compacted.push({ id, length: value });

    const empty = emptySpaces[i];
    if (empty != null) {
      compacted.push({ id: 'empty', length: empty });
    }
  }

  const movedIDs = new Set<number>();

  for (let i = compacted.length - 1; i >= 0; i--) {
    const block = compacted[i];

    const length = block.length;
    const id = block.id;

    if (id === 'empty') {
      continue;
    }

    if (movedIDs.has(id)) {
      continue;
    }

    movedIDs.add(id);

    for (let j = 0; j < i; j++) {
      const otherBlock = compacted[j];
      const otherLength = otherBlock.length;
      const otherId = otherBlock.id;

      if (otherId !== 'empty') {
        continue;
      }

      if (length > otherLength) {
        continue;
      }

      const remaining = otherLength - length;

      compacted[i] = { id: 'empty', length: length };

      if (remaining === 0) {
        compacted[j] = { id: id, length: length };
      } else {
        compacted[j] = { id: 'empty', length: remaining };
        compacted.splice(j, 0, { id: id, length: length });
      }

      break;
    }
  }

  let checkSum = 0;
  let index = 0;

  for (let i = 0; i < compacted.length; i++) {
    const block = compacted[i];

    if (block.id === 'empty') {
      index += block.length;
      continue;
    }

    const id = block.id;

    for (let j = 0; j < block.length; j++) {
      checkSum += id * index;
      index++;
    }
  }

  return checkSum.toString();
}
