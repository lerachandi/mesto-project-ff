// Открытие попапа 
function openPopup(evt) {
  evt.classList.add('popup_is-animated');
  setTimeout(function () {
    evt.classList.add("popup_is-opened");
  }, 0);
  document.addEventListener('keydown', closePopupEsc);

};

// Закрытие попапа на Esc
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    closePopup(popupOpened);
  }
};


// Закрытие попапов 
function closePopup(evt) {
  evt.classList.remove("popup_is-opened");
  document.removeEventListener('keydown', closePopupEsc);

};

// Закрытие попапов по клику на оверлей
function overlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  };
};


export { openPopup, overlayClick, closePopup };