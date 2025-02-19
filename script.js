import words from './words.json' with { type: 'json' };

export const customDictionary = new Set(words);

export function getMisspelledWords(text, dictionary = customDictionary) {
  const wordList = text.split(/\s+/).flatMap(word => {
    const cleanedWord = word.replace(/[,.?!":;]/g, '');
    return cleanedWord.split('-');
  });
  const misspelledWords = new Set();
  wordList.forEach(word => {
    if (word === '') return;
    const lowerCaseWord = word.toLowerCase();
    if (!dictionary.has(lowerCaseWord)) {
      // Ignore proper nouns (starting with a capital letter)
      if (!/^[A-Z]/.test(word)) {
        misspelledWords.add(word);
      }
    }
  });
  return misspelledWords;
}

// DOM Integration Code
const inputTextArea = document.getElementById('input-text');
const spellCheckButton = document.getElementById('spell-check-button');
const messageDiv = document.getElementById('message');

function checkSpelling() {
  const inputText = inputTextArea.value;
  messageDiv.innerHTML = '';
  const misspelledWords = getMisspelledWords(inputText);
  if (misspelledWords.size > 0) {
    const misspelledList = Array.from(misspelledWords).join(', ');
    messageDiv.innerHTML = `
      <p class="misspelled">Misspelled words: <span>${misspelledList}</span></p>
      <button id="add-to-dictionary" class="btn">Add to Dictionary</button>
    `;
    document.getElementById('add-to-dictionary').addEventListener('click', () => {
      misspelledWords.forEach(word => customDictionary.add(word.toLowerCase()));
      checkSpelling(); // Re-run spell check after adding words
    });
  } else {
    messageDiv.innerHTML = '<p>All words are spelled correctly!</p>';
  }
}

function updateSpellCheckButtonState() {
  spellCheckButton.disabled = inputTextArea.value.trim() === '';
  messageDiv.innerHTML = ''; // Clear any displayed warning message when input changes
}

// Only attach event listeners if the expected DOM elements exist
if (inputTextArea && spellCheckButton && messageDiv) {
  spellCheckButton.addEventListener('click', checkSpelling);
  inputTextArea.addEventListener('input', updateSpellCheckButtonState);
  updateSpellCheckButtonState();
}
