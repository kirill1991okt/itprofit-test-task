import postData from '../services/postData.js';
import openModal from './modal.js';

const form = document.querySelector('#form'),
  usernameEl = document.querySelector('#name'),
  emailEl = document.querySelector('#email'),
  phoneEl = document.querySelector('#phone'),
  textEl = document.querySelector('#text');

const inputFields = [usernameEl, emailEl, phoneEl, textEl];

usernameEl.isValid = () => !!usernameEl.value;
emailEl.isValid = () => isEmailValid(emailEl.value);
phoneEl.isValid = () => isPhoneValid(phoneEl.value);
textEl.isValid = () => !!textEl.value;

const isEmailValid = (email) => {
  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return regex.test(email);
};

const isPhoneValid = (phone) => {
  let regex = new RegExp(
    /(?:\+375)\s?\(?\d\d\)?\s?\d\d(?:\d[\-\s]\d\d[\-\s]\d\d)/
  );
  return regex.test(phone);
};

let shouldValidate = false;
let isFormValid = false;

const validateInputs = () => {
  if (!shouldValidate) return;

  isFormValid = true;
  inputFields.forEach((input) => {
    input.classList.remove('invalid');
    input.nextElementSibling.classList.add('hide');

    if (!input.isValid()) {
      input.classList.add('invalid');
      isFormValid = false;
      input.nextElementSibling.classList.remove('hide');
    }
  });
};

form.addEventListener('submit', function (e) {
  e.preventDefault();

  shouldValidate = true;
  validateInputs();

  if (isFormValid) {
    postData('http://localhost:9090/api/registration', {
      name: usernameEl.value,
      email: emailEl.value,
      phone: phoneEl.value,
      message: textEl.value,
    })
      .then((response) => {
        if (response.status === 'success') {
          openModal('.modal', '.modal__text', response.message + '!');
        } else {
          let message = `${response.message}, try again later! `;
          openModal('.modal', '.modal__text', message);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        usernameEl.value = '';
        emailEl.value = '';
        phoneEl.value = '';
        textEl.value = '';
      });
  }
});

inputFields.forEach((input) => input.addEventListener('input', validateInputs));
