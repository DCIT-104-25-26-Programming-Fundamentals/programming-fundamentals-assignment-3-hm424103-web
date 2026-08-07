// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readPositiveInteger(prompt) {
  while (true) {
    const inputValue = readlineSync.question(prompt);
    const number = parseInt(inputValue, 10);

    if (!Number.isNaN(number) && number > 0) {
      return number;
    }

    console.log('Please enter a valid positive integer.');
  }
}

function readMatrix(label) {
  const rows = readPositiveInteger(`Enter number of rows for ${label}: `);
  const columns = readPositiveInteger(`Enter number of columns for ${label}: `);
  const matrix = [];

  for (let row = 0; row < rows; row += 1) {
    while (true) {
      const inputLine = readlineSync.question(`Enter row ${row + 1} for ${label} (space-separated): `);
      const tokens = inputLine.trim().split(/\s+/);
      const values = [];
      let isValid = true;

      if (tokens.length !== columns) {
        console.log(`Please enter exactly ${columns} values.`);
        continue;
      }

      for (let col = 0; col < columns; col += 1) {
        const value = parseFloat(tokens[col]);

        if (Number.isNaN(value)) {
          isValid = false;
          break;
        }

        values.push(value);
      }

      if (isValid) {
        matrix.push(values);
        break;
      }

      console.log('Please enter only numeric values.');
    }
  }

  return matrix;
}

function displayMatrix(matrix) {
  for (let row = 0; row < matrix.length; row += 1) {
    let line = '';

    for (let col = 0; col < matrix[row].length; col += 1) {
      line += `${matrix[row][col]}`.padStart(6);
    }

    console.log(line);
  }
}

function transposeMatrix(matrix) {
  const rows = matrix.length;
  const columns = matrix[0].length;
  const transpose = [];

  for (let col = 0; col < columns; col += 1) {
    const newRow = [];

    for (let row = 0; row < rows; row += 1) {
      newRow.push(matrix[row][col]);
    }

    transpose.push(newRow);
  }

  return transpose;
}

function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const columns = matrixA[0].length;
  const result = [];

  for (let row = 0; row < rows; row += 1) {
    const newRow = [];

    for (let col = 0; col < columns; col += 1) {
      newRow.push(matrixA[row][col] + matrixB[row][col]);
    }

    result.push(newRow);
  }

  return result;
}

function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const columnsA = matrixA[0].length;
  const rowsB = matrixB.length;
  const columnsB = matrixB[0].length;
  const result = [];

  for (let row = 0; row < rowsA; row += 1) {
    const newRow = [];

    for (let col = 0; col < columnsB; col += 1) {
      let sum = 0;

      for (let index = 0; index < columnsA; index += 1) {
        sum += matrixA[row][index] * matrixB[index][col];
      }

      newRow.push(sum);
    }

    result.push(newRow);
  }

  return result;
}

function runPartA() {
  console.log('\n=== Part A — Transpose a Matrix ===');
  const matrix = readMatrix('matrix');

  console.log('\nOriginal Matrix:');
  displayMatrix(matrix);

  const transposed = transposeMatrix(matrix);
  console.log('\nTransposed Matrix:');
  displayMatrix(transposed);
}

function runPartB() {
  console.log('\n=== Part B — Add Two Matrices ===');
  const matrixA = readMatrix('matrix A');
  const matrixB = readMatrix('matrix B');

  if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
    console.log('Error: Matrices must have the same dimensions.');
    return;
  }

  console.log('\nMatrix A:');
  displayMatrix(matrixA);

  console.log('\nMatrix B:');
  displayMatrix(matrixB);

  const sum = addMatrices(matrixA, matrixB);
  console.log('\nSum of Matrices:');
  displayMatrix(sum);
}

function runPartC() {
  console.log('\n=== Part C — Multiply Two Matrices ===');
  const matrixA = readMatrix('matrix A');
  const matrixB = readMatrix('matrix B');

  if (matrixA[0].length !== matrixB.length) {
    console.log('Error: The number of columns in matrix A must equal the number of rows in matrix B.');
    return;
  }

  console.log('\nMatrix A:');
  displayMatrix(matrixA);

  console.log('\nMatrix B:');
  displayMatrix(matrixB);

  const product = multiplyMatrices(matrixA, matrixB);
  console.log('\nProduct of Matrices:');
  displayMatrix(product);
}

function main() {
  runPartA();
  runPartB();
  runPartC();
}

main();

