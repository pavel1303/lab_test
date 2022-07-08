import '../scss/style.scss';

const moreInfoBtn = document.querySelector('.total__more-inf');
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__btn');
const body = document.querySelector('body');
const dateInputs = document.querySelectorAll('.date-selection__items input');
const dateSelectionItems = document.querySelectorAll('.date-selection__item');
const addressInputs = document.querySelectorAll('.address-selection__items input');
const addressSelectionItems = document.querySelectorAll('.address-selection__item');
const tumblers = document.querySelectorAll('.tumblers__item');
const tumblerLeft = document.querySelector('#left-switch');
const tumblerRight = document.querySelector('#right-switch');

moreInfoBtn.addEventListener('click', () => {
  popup.classList.add('popup--open');
  body.style.overflow = 'hidden';
});
closePopupBtn.addEventListener('click', () => {
  popup.classList.remove('popup--open');
  body.style.overflow = 'auto';
});

addressInputs.forEach((el, i, arr) => {
  el.addEventListener('input', (e) => {
    const target = e.currentTarget;
    addressSelectionItems.forEach((item) => item.classList.remove('address-selection__item--select'));
    target.parentNode.classList.add('address-selection__item--select');
    if (!arr[i + 1]) {
      tumblerRight.classList.add('tumblers__item--disable');
      tumblerLeft.classList.remove('tumblers__item--disable');
    }
    if (!arr[i - 1]) {
      tumblerRight.classList.remove('tumblers__item--disable');
      tumblerLeft.classList.add('tumblers__item--disable');
    }
  });
});

tumblers.forEach((el) => {
  el.addEventListener('click', () => {
    if (el.classList.contains('tumblers__item--disable')) return;

    if (el.id === 'right-switch') {
      for (let i = 0; i < addressSelectionItems.length; i += 1) {
        if (addressSelectionItems[i].classList.contains('address-selection__item--select') && addressSelectionItems[i + 1]) {
          addressSelectionItems[i].classList.remove('address-selection__item--select');
          addressInputs[i].checked = 'false';
          addressSelectionItems[i + 1].classList.add('address-selection__item--select');
          addressInputs[i + 1].checked = 'true';
          if (!addressSelectionItems[i + 2]) el.classList.add('tumblers__item--disable');
          if (addressSelectionItems[i]) tumblerLeft.classList.remove('tumblers__item--disable');
        }
      }
    }
    if (el.id === 'left-switch') {
      for (let i = addressSelectionItems.length - 1; i >= 0; i -= 1) {
        if (addressSelectionItems[i].classList.contains('address-selection__item--select') && addressSelectionItems[i - 1]) {
          addressSelectionItems[i].classList.remove('address-selection__item--select');
          addressInputs[i].checked = 'false';
          addressSelectionItems[i - 1].classList.add('address-selection__item--select');
          addressInputs[i - 1].checked = 'true';
          if (!addressSelectionItems[i - 2]) el.classList.add('tumblers__item--disable');
          if (addressSelectionItems[i]) tumblerRight.classList.remove('tumblers__item--disable');
        }
      }
    }
  });
});

dateInputs.forEach((el) => {
  el.addEventListener('input', (e) => {
    const target = e.currentTarget;
    dateSelectionItems.forEach((item) => item.classList.remove('date-selection__item--select'));
    target.parentNode.classList.add('date-selection__item--select');
  });
});
