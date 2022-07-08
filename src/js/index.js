const moreInfoBtn = document.querySelector('.total__more-inf');
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__btn');
const body = document.querySelector('body');

moreInfoBtn.addEventListener('click', () => {
  popup.classList.add('popup--open');
  body.style.overflow = 'hidden';
});
closePopupBtn.addEventListener('click', () => {
  popup.classList.remove('popup--open');
  body.style.overflow = 'auto';
});
