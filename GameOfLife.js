let cols;
let rows;
let matrix;
let resolution = 5;

let PAINT_RULE = false;

function makeMatrix(cols, rows) {
  let matrix = new Array(cols);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(rows);
  }

  return matrix;
}

function setup() {
  createCanvas(1200, 800);
  cols = width / resolution;
  rows = height / resolution;

  matrix = makeMatrix(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      matrix[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (matrix[i][j] == 1)
      {
        fill(255);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }

  matrix = next(matrix);
}

function next(matrix) {
  let next = makeMatrix(cols, rows);

  for (let i = 0; i < cols; i++) {    
    for (let j = 0; j < rows; j++) {   
      let liveNeighbours = countNeighboursWrapAround(matrix, i, j);

      // 1. Any live cell with fewer than two live neighbours dies by underpopulation
      // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (liveNeighbours < 2 || liveNeighbours > 3)
      {
        fill(255, 0, 0, 100);
        next[i][j] = 0;
      }
      // 2. Any live cell with two or three live neighbours lives on to the next generation.
      // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      else if ( liveNeighbours == 3) {
        fill(0, 255, 0, 100);
        next[i][j] = 1;
      }
      // Otherwise copy old matrix contents
      else {
        fill(0, 0, 255, 100);
        next[i][j]  = matrix[i][j];
      }

      if (PAINT_RULE)
      {
        ellipse(i * resolution + resolution/2, j * resolution + resolution/2, resolution, resolution);
      }
    }
  }

  return next;
}

function countNeighbours(matrix, i, j)
{
  let startX = i - 1 < 0 ? 0 : i -1;
  let startY = j -1 < 0? 0 : j - 1;
  let endX = i + 1 >= cols? cols - 1 : i + 1;
  let endY = j + 1 >= rows? rows - 1 : j + 1;

  let liveNeighbours = 0;
  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      liveNeighbours += matrix[x][y];
    }
  }

  liveNeighbours -= matrix[i][j];
  return liveNeighbours;
}

function countNeighboursWrapAround(matrix, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += matrix[col][row];
    }
  }
  sum -= matrix[x][y];
  return sum;
}
