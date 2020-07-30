const $word = document.getElementById('word');
const $wrongLetters = document.getElementById('wrong-letters');
const $popupContainer = document.getElementById('popup-container');
const $playAgainButton = document.getElementById('play-again-button');

const words = ['admantium', 'python', 'kubernetes', 'javascript'];

var guessWord = (words[Math.floor(Math.random() * words.length)]).split('');
var correctLetters = [];
var wrongLetters = [];

function initGame() {
  console.log("Init Game");
  guessWord = (words[Math.floor(Math.random() * words.length)]).split('');
  console.log(guessWord);
  correctLetters = [];
  wrongLetters = [];
  updateUi();
}

function resetGame() {
  initGame();
  $popupContainer.classList.toggle('show-popup');
}

function checkWinning() {
  console.log("Winning?", [...new Set(guessWord)].length, [...new Set(correctLetters)].length)
  if ([...new Set(guessWord)].length === [...new Set(correctLetters)].length) {
    $popupContainer.classList.add('show-popup');
  };
}

function renderCorrectLetters() {
  const html = guessWord.map(letter => {
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
  console.log("includeds", guessWord.includes(letter))
  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
    return;
  }

  if (guessWord.includes(letter)) {
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
  checkWinning();
}

document.addEventListener('keydown', handleKeydown);
$playAgainButton.addEventListener('click', resetGame);

initGame();

