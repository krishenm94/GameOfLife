class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.grid = makeGrid();
    initCells();
  }

  makeGrid() {
    let grid = new Array(this.cols);
    for (let i = 0; i < arr.length; i++) {
      grid[i] = new Array(this.rows);
    }

    return grid;
  }

  initCells() {
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = Cell(random(2));
      }
    }
  }

  paint(resolution) {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let x = i * resolution;
        let y = j * resolution;
        fill(grid[i][j] % 2 == 0? 255 : 0);
        square(x, y, resolution);
      }
    }
  }
}
