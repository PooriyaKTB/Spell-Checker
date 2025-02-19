// import { checkSpelling } from './script.js';

// test('checkSpelling identifies misspelled words', () => {
//   const inputText = "he go to the iland";
//   const misspelledWords = checkSpelling(inputText);
//   expect(misspelledWords).toContain("iland");
// });

// test('checkSpelling ignores proper nouns', () => {
//   const inputText = "Ali go to London";
//   const misspelledWords = checkSpelling(inputText);
//   expect(misspelledWords).toHaveLength(0);
// });

// test('checkSpelling handles punctuation', () => {
//   const inputText = "make a cake, please";
//   const misspelledWords = checkSpelling(inputText);
//   expect(misspelledWords).toHaveLength(0);
// });

import { checkSpelling } from './script.js';

test('checkSpelling identifies misspelled words', () => {
  const inputText = "he go to the iland";
  const misspelledWords = checkSpelling(inputText);
  expect(misspelledWords).toContain("iland");
});

test('checkSpelling ignores proper nouns', () => {
  const inputText = "Ali go to London";
  const misspelledWords = checkSpelling(inputText);
  expect(misspelledWords).toHaveLength(0);
});

test('checkSpelling handles punctuation', () => {
  const inputText = "make a cake, please";
  const misspelledWords = checkSpelling(inputText);
  expect(misspelledWords).toHaveLength(0);
});

test('checkSpelling handles hyphenated words', () => {
  const inputText = "blue-green feisty-cat";
  const misspelledWords = checkSpelling(inputText);
  expect(misspelledWords).toContain("feisty");
  expect(misspelledWords).not.toContain("blue");
  expect(misspelledWords).not.toContain("green");
  expect(misspelledWords).not.toContain("cat");
});

test('checkSpelling recognizes "is" as correct', () => {
  const inputText = "he is at the island";
  const misspelledWords = checkSpelling(inputText);
  expect(misspelledWords).toHaveLength(0);
});