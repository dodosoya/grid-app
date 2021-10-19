// generate a random integer between min and max
export function getRandomInt(min, max) {
  return Math.floor(min + (max - min + 1) * Math.random());
}

// generate a two-dimensional random array
export function generateRandomGrid(m, n) {
  let grid = [];
  for (let i = 0; i < m; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push(getRandomInt(0, 1));
    }
    grid.push(row);
  }
  return grid; 
}

// mark a two-dimensional array based on the given position (i, j)
// 0: empty square, 1: filled square, -1: current connected filled square
export function markGrid(grid, i, j) {
  if (!grid || !grid[0]) return grid;

  let copyGrid = JSON.parse(JSON.stringify(grid));
  let count = 0;

  function dfs(grid, i, j) {
    if (i >= 0 && i < grid.length 
      && j >= 0 && j < grid[0].length
      && grid[i][j] === 1
    ) {
      grid[i][j] = -1;
      count++;
      const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (let index in directions) {
        dfs(grid, i + directions[index][0], j + directions[index][1]);
      }
    }
  }

  dfs(copyGrid, i, j);
  return {
    rowIndex: i,
    colIndex: j, 
    grid: copyGrid,
    count
  };
}
