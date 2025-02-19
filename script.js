import words from './words.json' with { type: 'json' };

const customDictionary = new Set(words); // Use a Set for faster lookups

// Cache DOM elements for reuse
const inputTextArea = document.getElementById('input-text');
const spellCheckButton = document.getElementById('spell-check-button');
const messageDiv = document.getElementById('message');

function checkSpelling() {
  const inputText = inputTextArea.value;
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
      // If the word is not in the dictionary and it is not a proper noun (starts with a capital letter)
      if (!/^[A-Z]/.test(word)) {
        misspelledWords.add(word);
      }
    }
  });

  if (misspelledWords.size > 0) {
    const misspelledList = Array.from(misspelledWords).join(', ');
    messageDiv.innerHTML = `
      <p class="misspelled">Misspelled words: <span>${misspelledList}</span></p>
      <button id="add-to-dictionary" class="btn">Add to Dictionary</button>
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

// Attach the spell check function to the "Check Spelling" button
spellCheckButton.addEventListener('click', checkSpelling);

// Disable the "Check Spelling" button when the input is empty

// Function to update the button's enabled/disabled state based on input content
function updateSpellCheckButtonState() {
  spellCheckButton.disabled = inputTextArea.value.trim() === '';
  // Clear any displayed warning message when the input changes
  messageDiv.innerHTML = '';
}

// Initially update the button state on page load
updateSpellCheckButtonState();

// Update the button state on every input event in the textarea
inputTextArea.addEventListener('input', updateSpellCheckButtonState);
