import { logUp, logIn } from './loginApi';

import { checkButtonsOnCloseModal } from './header';

const form = document.getElementById('formUp');
const bUp = document.querySelector('.sUpBtb');
const bIn = document.querySelector('.sInBtb');
const btnText = document.querySelector('.loginBtnText');
const loginClose = document.querySelector('.loginClose');
const backdropBurger = document.querySelector('backdrop-burger');

const nameLabel = document.querySelector('.nameCont');
const name = document.getElementById('name');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
// const submit = document.querySelector('.loginBtn');

const backDrop = document.querySelector('.loginBacdropLogIn');
backDrop.addEventListener('click', e => {
  if (e.target === backDrop) backDrop.classList.add('isHidden');
});

let logIs = true;

loginClose.addEventListener('click', () => {
  backDrop.classList.add('isHidden');

  if (!backdropBurger.classList.contains('is-open')) {
    document.querySelector('body').classList.remove = 'scroll-lock';
  }

  checkButtonsOnCloseModal();
});

bUp.addEventListener('click', () => {
  nameLabel.hidden = false;
  bUp.classList.add('active');
  bIn.classList.remove('active');
  logIs = true;
  btnText.textContent = 'SING UP';
});
bIn.addEventListener('click', () => {
  nameLabel.hidden = true;
  bUp.classList.remove('active');
  bIn.classList.add('active');
  logIs = false;
  btnText.textContent = 'SING IN';
});

form.addEventListener('submit', e => {
  e.preventDefault();
  sing();

  form.reset();
});

function sing() {
  if (logIs) {
    if (name.value.trim() && email.value.trim() && pass.value.trim())
      logUp(name.value, email.value, pass.value);
  } else {
    if (email.value.trim() && pass.value.trim()) logIn(email.value, pass.value);
  }
}
