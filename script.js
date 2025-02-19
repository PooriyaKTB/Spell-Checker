import words from './words.json' with { type: 'json' };

let customDictionary = new Set(words); // Use a Set for faster lookups

function checkSpelling() {
  const inputText = document.getElementById('input-text').value;
  const messageDiv = document.getElementById('message');
  messageDiv.innerHTML = ''; // Clear previous messages

  // Split the input text into words, handling punctuation and hyphens
  const wordList = inputText.split(/\s+/).flatMap(word => {
    // Remove punctuation from the word
    const cleanedWord = word.replace(/[,.?!":;]/g, '');
    // Split hyphenated words into individual words
    return cleanedWord.split('-');
  });

  const misspelledWords = new Set();

  wordList.forEach(word => {
    const lowerCaseWord = word.toLowerCase();
    if (!customDictionary.has(lowerCaseWord)) {
      // Check if the word is a proper noun (starts with a capital letter)
      if (!/^[A-Z]/.test(word)) {
        misspelledWords.add(word);
      }
    }
  });

  if (misspelledWords.size > 0) {
    const misspelledList = Array.from(misspelledWords).join(', ');
    messageDiv.innerHTML = `
      <p class="misspelled">Misspelled words: <span>${misspelledList}</span></p>
      <button id="add-to-dictionary">Add to Dictionary</button>
    `;

    // Add event listener for the "Add to Dictionary" button
    document.getElementById('add-to-dictionary').addEventListener('click', () => {
      misspelledWords.forEach(word => customDictionary.add(word.toLowerCase()));
      checkSpelling(); // Re-run spell check after adding words
    });
  } else {
    messageDiv.innerHTML = '<p>All words are spelled correctly!</p>';
  }
}

// Attach the spell check function to the button
document.getElementById('spell-check-button').addEventListener('click', checkSpelling);