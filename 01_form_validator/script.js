const form = document.getElementById('form');
const userame = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const button = document.getElementById('button');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

function checkEmail(input) {
  const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  if (regex.test(input)) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}

function checkPasswordsMatch(input1, input2) {
  console.log("CHECK", input1.value, input2.value)
  if (input1.value !== input2.value) {
    showError(input1, '');
    showError(input2, `Passwords do not match`);
  } else {
    showSuccess(input1);
    showSuccess(input2);

  }
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

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min}`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1, input.id.length);
}

function submitForm(e) {
  e.preventDefault();

  addValidation([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkPasswordsMatch(password, password2);

  checkEmail(email);
}

button.addEventListener('click', submitForm);


function checkInputLength(inputId, min, max) {
  const input = document.getElementById(inputId);
  if (input.value.length < min) {
    return [false, `${input.id} must be at least ${min}`]
  } else if (input.value.length > max) {
    return [false, `${input.id} must be less than ${max} characters`]
  }
  return [true, ``]
}

function validate(field, validationResult) {
  const [success, msg] = validationResult;
  if (success) {
    showSuccess(msg)
  } else {
    showError(msg)
  };
}

function showError(input, msg) {
  const parent = input.parentElement;
  parent.classList.remove = 'success';
  parent.classList.add = 'error';
  parent.querySelector('small').innerText = msg
}

function showSuccess(input, msg) {
  const parent = input.parentElement;
  parent.classList.remove = 'error';
  parent.classList.add = 'success';
  parent.querySelector('small').innerText = msg
}

function validateFields() {
  validate('username', checkInputLength('username', 6, 15));
}

document.getElementById('sign-up-form').addEventListener('submit', validateFields)

