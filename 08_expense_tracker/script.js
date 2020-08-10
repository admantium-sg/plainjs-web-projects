const $balance = document.getElementById('balance');
const $moneyPlus = document.getElementById('money-plus');
const $moneyMinus = document.getElementById('money-minus');
const $list = document.getElementById('list');
const $form = document.getElementById('form');
const $text = document.getElementById('text');
const $amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

var transactions = dummyTransactions;

function renderTransactions () {
  const nodesArr = [];
  transactions.forEach(t => {
    const node = document.createElement('li');
    node.classList.add(t.amount < 0 ? 'minus' : 'plus');

    const sign = t.amount < 0 ? '-' : '+';
    const innerHtml = `${t.text}
<span>${sign}${Math.abs(t.amount)}</span>`;

    node.innerHTML = innerHtml;

    nodesArr.push(node);
  });
  console.log(nodesArr);

  nodesArr.forEach(node => $list.appendChild(node));
}

function init () {
  renderTransactions();
}

init();
