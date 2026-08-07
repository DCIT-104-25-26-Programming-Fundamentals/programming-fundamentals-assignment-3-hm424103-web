// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 5
// =============================================================================
//
// TASK: Fibonacci Sequence Generator
//
// The Fibonacci sequence is a series of numbers where each number is the sum
// of the two numbers before it:
//
//   0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
//
// Write a JavaScript program with TWO parts, each implemented as a function.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_05_fibonacci_sequence.js
//
// -----------------------------------------------------------------------------
// PART A — Print the First N Terms
// -----------------------------------------------------------------------------
// - Ask the user how many terms (N) to display.
// - Print the first N numbers of the Fibonacci sequence on one line.
//
// Example:
//   How many terms? 7
//   Fibonacci sequence: 0 1 1 2 3 5 8
//
// -----------------------------------------------------------------------------
// PART B — Check if a Number Belongs to the Sequence
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Determine whether that number is a Fibonacci number.
// - Print an appropriate message.
//
// Example:
//   Enter a number to check: 13
//   13 is a Fibonacci number.
//
//   Enter a number to check: 20
//   20 is NOT a Fibonacci number.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use a loop (not recursion) to generate the sequence in both parts.
// - N must be a positive integer. If it is not, print an error message.
// - Each part must be implemented in its own function (see scaffold below).
//

//
// =============================================================================
// YOUR CODE BELOW
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

function generateFibonacciTerms(count) {
  const sequence = [];
  let previous = 0;
  let current = 1;

  for (let i = 0; i < count; i += 1) {
    sequence.push(previous);
    const next = previous + current;
    previous = current;
    current = next;
  }

  return sequence;
}

function printFirstNTerms() {
  console.log('\n=== Part A — Print the First N Terms ===');
  const count = readPositiveInteger('How many terms do you want to display? ');
  const sequence = generateFibonacciTerms(count);

  console.log(`Fibonacci sequence: ${sequence.join(' ')}`);
}

function isFibonacciNumber(number) {
  if (number < 0) {
    return false;
  }

  if (number === 0 || number === 1) {
    return true;
  }

  let previous = 0;
  let current = 1;

  while (current < number) {
    const next = previous + current;
    previous = current;
    current = next;
  }

  return current === number;
}

function checkFibonacciNumber() {
  console.log('\n=== Part B — Check if a Number Belongs to the Sequence ===');
  const inputValue = readlineSync.question('Enter a number to check: ');
  const number = parseInt(inputValue, 10);

  if (Number.isNaN(number) || number < 0) {
    console.log('Please enter a valid non-negative integer.');
    return;
  }

  if (isFibonacciNumber(number)) {
    console.log(`${number} is a Fibonacci number.`);
  } else {
    console.log(`${number} is NOT a Fibonacci number.`);
  }
}

function main() {
  printFirstNTerms();
  checkFibonacciNumber();
}

main();

