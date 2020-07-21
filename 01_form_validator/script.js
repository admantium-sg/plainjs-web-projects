const form = document.getElementById('form');
const userame = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const button = document.getElementById('button');

console.log(form);

function showError(input, message) {
  const formControl = input.parentElement;
  console.log("showError", formControl);
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  console.log(small);
  small.innerText = message
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

function isValidEmail(email) {
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  return regex.test(email);
}



function addValidation(inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  })
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1, input.id.length);
}

function submitForm(e) {
  e.preventDefault();
  console.log("submit", e);

  console.log("username", username.value);

  addValidation([username, email, password, password2])

  if (!isValidEmail(email.value)) {
    showError(email, 'Email is not valid');
  }


}

button.addEventListener('click', submitForm);
