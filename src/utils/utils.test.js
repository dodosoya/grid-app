import { getRandomInt, generateRandomGrid, markGrid } from './index';

it('getRandomInt', () => {
  const min = 0;
  const max = 1;
  const randomInt = getRandomInt(min, max);
  expect(randomInt >= min).toBeTruthy();
  expect(randomInt <= max).toBeTruthy();
});

it('generateRandomGrid', () => {
  const row = 10, col = 5;
  const grid = generateRandomGrid(row, col);
  expect(grid.length).toEqual(row);
  expect(grid[0].length).toEqual(col);
});

it('markGrid', () => {
  const rowIndex = 4;
  const colIndex = 0;
  const grid = [
    [0, 0, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0]
  ];
  const expectResult = {
    rowIndex,
    colIndex,
    grid: [
      [0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0],
      [-1, -1, -1, 0, 0]
    ],
    count: 3
  };
  expect(markGrid(grid, rowIndex, colIndex)).toEqual(expectResult);
});
