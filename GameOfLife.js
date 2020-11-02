let cols;
let rows;
let matrix;
let nextMatrix;
let resolution = 20;

function makeMatrix(cols, rows) {
  let matrix = new Array(cols);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(rows);
  }

  return matrix;
}

function getNeighourhoodCount(matrix, x, y)
{
  let startX = i - 1 < 0 ? 0 : i -1;
  let startY = j -1 < 0? 0 : j - 1;
  let endX = i + 1 > matrix.length? matrix.length : i + 1;
  let endY = j + 1 > matrix[0].length? matrix[0].length : j + 1;

  let liveNeighbours = 0;
  for (let i = startX; x <= endX; x++) {
    for (let j = startY; y <= endY; y++) {
      if (matrix[i][j] == 1 && !(i == x || j == y) ) {
        liveNeighbours++;
      }
    }
  }

  return liveNeighbours;
}


function updateMatrix(matrix, nextMatrix) {
  for (let i = 0; i < matrix.length; i++)
  { 
    col = matrix[i];
    for (let j = 0; j < row.length; j++)
    {   
      let liveNeighbours = getNeighbourhoodCount(matrix, i, j);

      // 1. Any live cell with fewer than two live neighbours dies by underpopulation
      // 3. Any live cell with more than three live neighbours dies, as if by overpopulation.
      if (liveNeighbours < 2 || liveNeighbours > 3)
      {
        nextMatrix[i][j] = 0;
      }
      // 2. Any live cell with two or three live neighbours lives on to the next generation.
      // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      else if ( liveNeighbours == 3) {
        nextMatrix[i][j] = 1;
      }

      return nextMatrix;
    }
  }
}

function setup() {
  createCanvas(800, 800);
  cols = width / resolution;
  rows = height / resolution;

  matrix = makeMatrix(cols, rows);
  nextMatrix = makeMatrix(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      matrix[i][j] = floor(random(2));
    }
  }

  background(0); 
  stroke(0);
}

function draw() {

  updateMatrix(matrix, nextMatrix);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      fill(matrix[i][j] % 2 == 0? 255 : 0);
      square(x, y, resolution);
    }
  }

  let tempMatrix = matrix;
  matrix = nextMatrix;
  nextMatrix = tempMatrix;
}
