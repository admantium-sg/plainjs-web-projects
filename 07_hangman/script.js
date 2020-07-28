const $word = document.getElementById('word');
const $wrongLetters = document.getElementById('wrong-letters');

const words = ['admantium', 'python', 'kubernetes', 'javascript'];

const guessWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = ['k', 'b'];
const wrongLetters = ['j', 'a'];

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

renderCorrectLetters();
renderWrongLetters();

