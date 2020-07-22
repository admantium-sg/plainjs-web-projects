const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

console.log("Ticket Price", ticketPrice, typeof ticketPrice);

function updateStorage(key, json) {
  localStorage.setItem(key, json);
}

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  updateStorage('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

movieSelect.addEventListener('change', e => {
  ticketPrice = parseInt(e.target.value);
  updateStorage('selectedMovieIndex', e.target.selectedIndex);
  updateStorage('selectedMoviePrice', e.target.value);
  updateSelectedCount();
})

container.addEventListener('click', (e) => {
  const classes = e.target.classList
  if (classes.contains('seat') && !classes.contains('occupied')) {
    classes.toggle('selected');
  }

  updateSelectedCount();
})