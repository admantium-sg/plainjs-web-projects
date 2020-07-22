const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

loadState();
updateSelectedCount();

console.log("Ticket Price", ticketPrice, typeof ticketPrice);

// Storage abstractions
function updateState(key, json) {
  localStorage.setItem(key, json);
}

function readState(key) {
  return localStorage.getItem(key);
}

// Load state
function loadState() {
  const selectedSeats = JSON.parse(readState('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = readState('selectedMovieIndex');

  if (selectedMovieIndex !== null && typeof selectedMovieIndex === 'number') {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Updates ticket price
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  updateState('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// Change Movie
movieSelect.addEventListener('change', e => {
  ticketPrice = parseInt(e.target.value);
  updateState('selectedMovieIndex', e.target.selectedIndex);
  updateState('selectedMoviePrice', e.target.value);
  updateSelectedCount();
})

// Click Seats
container.addEventListener('click', (e) => {
  const classes = e.target.classList
  if (classes.contains('seat') && !classes.contains('occupied')) {
    classes.toggle('selected');
  }

  updateSelectedCount();
})