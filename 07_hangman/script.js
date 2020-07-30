const $word = document.getElementById('word');
const $wrongLetters = document.getElementById('wrong-letters');

const words = ['admantium', 'python', 'kubernetes', 'javascript'];

const guessWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];

console.log(guessWord);

function renderCorrectLetters() {
  const html = guessWord.split('').map(letter => {
    const val = correctLetters.includes(letter) ? letter : '';
    return `<div class="letter">${val}</div>`
  }).join('')
  $word.innerHTML = html;
}

function renderWrongLetters() {
  const text = wrongLetters.join(`, `);
  $wrongLetters.querySelector('small').innerHTML = text;
}

function checkLetter(letter) {
  console.log("checkLetter", letter)
  console.log("includeds", guessWord.split('').includes(letter))
  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
    return;
  }

  if (guessWord.split('').includes(letter)) {
    console.log("Correct letter")
    correctLetters.push(letter);
  } else {
    console.log("Incorrect letter")
    wrongLetters.push(letter);
  }
  updateUi()
}

function handleKeydown(e) {
  console.log(e);
  e.stopPropagation();
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    checkLetter(e.key.toLowerCase());
  }
}

function updateUi() {
  renderCorrectLetters();
  renderWrongLetters();
}

document.addEventListener('keydown', handleKeydown);
updateUi();

