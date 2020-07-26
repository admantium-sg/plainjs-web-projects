const toggle = document.getElementById('toggle');
const modalContainer = document.getElementById('modal-container');
const openButton = document.getElementById('open-button');
const closeButton = document.getElementById('close-button');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
})

openButton.addEventListener('click', () => {
  modalContainer.classList.add('show-modal');
})

closeButton.addEventListener('click', () => {
  modalContainer.classList.remove('show-modal');
})