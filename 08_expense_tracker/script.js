const $balance = document.getElementById('balance');
const $income = document.getElementById('money-plus');
const $expense = document.getElementById('money-minus');
const $list = document.getElementById('list');
const $form = document.getElementById('form');
const $text = document.getElementById('text');
const $amount = document.getElementById('amount');

const transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Event Listener

function addTransaction (e) {
  e.preventDefault();

  const text = $text.value.trim();
  const amount = parseInt($amount.value);

  transactions.push({ id: generateID(), text, amount });

  console.log(transactions);

  renderTransactions();
  renderGlobalBalance();

  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Helper

function generateID () {
  return Math.floor(Math.random() * 10000);
}

// Render Functions

function renderTransactions () {
  $list.innerHTML = '';
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

  nodesArr.forEach(node => $list.appendChild(node));
}

function renderGlobalBalance () {
  const amountsArr = transactions.map(t => t.amount);

  var balance = 0;
  var income = 0;
  var expense = 0;

  try {
    balance = amountsArr.reduce((total, t) => (total += t)).toFixed(2);

    income = amountsArr
      .filter(t => t > 0)
      .reduce((total, t) => (total += t))
      .toFixed(2);

    expense = Math.abs(
      amountsArr.filter(t => t <= 0).reduce((total, t) => (total += t))
    ).toFixed(2);
  } catch (e) {
    // do nothing
  } finally {
    $balance.innerText = '$' + balance;
    $income.innerText = '$' + income;
    $expense.innerText = '-$' + expense;
  }
}

function init () {
  renderTransactions();
  renderGlobalBalance();

  $form.addEventListener('submit', addTransaction);
}

init();
