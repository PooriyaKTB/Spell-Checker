/**
 * @jest-environment jsdom
 */

import { getMisspelledWords } from './script.js';

describe('getMisspelledWords', () => {
  // Create a sample dictionary for testing purposes.
  const testDictionary = new Set([
    "he", "go", "to", "the", "island",
    "make", "a", "cake", "blue", "green", "cat", "please"
  ]);
  
  test('identifies misspelled words', () => {
    const text = "he go to the iland";
    const result = getMisspelledWords(text, testDictionary);
    expect(Array.from(result)).toEqual(["iland"]);
  });

  test('ignores proper nouns', () => {
    const text = "Ali go to London";
    const result = getMisspelledWords(text, testDictionary);
    // "Ali" and "London" should be ignored even though they aren’t in the dictionary.
    expect(result.size).toBe(0);
  });

  test('handles punctuation correctly', () => {
    const text = "make a cake, please";
    const result = getMisspelledWords(text, testDictionary);
    expect(result.size).toBe(0);
  });

  test('handles hyphenated words', () => {
    const text = "blue-green feisty-cat";
    // Expect "blue", "green", and "cat" to be correct; "feisty" is not.
    const result = getMisspelledWords(text, testDictionary);
    expect(Array.from(result)).toEqual(["feisty"]);
  });
});
