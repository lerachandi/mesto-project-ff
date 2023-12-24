import "../pages/index.css";
// import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from './card.js';
import { openPopup, overlayClick, closePopup } from './modal.js';
import { clearValidation, enableValidation } from './validation.js'; 
import { getUserInfo, getInitialCards, saveProfileData, saveNewPlaceCard, handleSetLike, handleRemoveLike, deleteCardData, saveUserAvatar } from './api.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Список всех картинок
const placesItem = document.querySelector(".places__list"); // лист со всеми картинками+

// Попапы
const popupTypeEdit = document.querySelector('.popup_type_edit');//Попап редактирования профиля+
const popupPlace = document.querySelector(".popup_type_new-card"); // попап добавления нового места+
const popupPlaceImage = document.querySelector('.popup_type_image'); // попап изображения+
const photoPopupPlaceImage = popupPlaceImage.querySelector(".popup__image"); // попап картинки+
const titlePopupPlaceImage = popupPlaceImage.querySelector(".popup__caption"); // подпись картинки=


// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля +
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка добавления места +
const closeButtonList = document.querySelectorAll(".popup__close"); // Кнопка закрытия для всех попапов+

// Форма: Профиль
const profileImage = document.querySelector('.profile__image'); //+
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar'); // +
const popupEditProfile = document.forms['edit-profile'];//+
const profileDescription = document.querySelector(".profile__description"); //отображаемое описание
const descriptionInput = popupEditProfile.querySelector('.popup__input_type_description'); // Инпут поля описания+
const nameInput = popupEditProfile.querySelector(".popup__input_type_name"); // инпут имени+
const profileName = document.querySelector(".profile__title"); //отображаемое имя+
const popupEditProfileButton = popupEditProfile.querySelector('.popup__button')

// Обновление аватарки
const popupUpdateAvatar = document.querySelector('.popup_type_update-avatar');
const popupFormUpdateAvatar = document.forms['update-avatar'];
const popupInputAvatarUrl = popupFormUpdateAvatar.querySelector('.popup__input_type_avatar-url');
const popupFormUpdateAvatarButton = popupFormUpdateAvatar.querySelector('.popup__button');

// Форма: Место
const popupNewPlace = document.forms['new-place']; //+
const popupNewPlaceButton = popupNewPlace.querySelector('.popup__button') //+
const cardNameInput = popupNewPlace.querySelector('.popup__input_type_card-name'); // инпут названия+
const cardUrlInput = popupNewPlace.querySelector('.popup__input_type_url'); // инпут поля ссылки на изображение+

let userId;



function addCard(cardElement) {
  placesItem.append(cardElement);
}



function changeLikeHandler(cardId, cardLikeCountElement, cardLikeButton) {
  likeCard(cardId, cardLikeCountElement, cardLikeButton);
}



function addNewPlace(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler, userId);
  placesItem.prepend(card);
}

function renderCards(initialCards) {
  initialCards.forEach(cardData => {
    const cardElement = createCard(cardData, deleteCard, changeLikeHandler, openImagePopup, userId);
    addCard(cardElement);
  });
}

function openAvatarPopup() {
  clearValidation(popupFormUpdateAvatar, config);
  openPopup(popupUpdateAvatar);
}

function openEditProfilePopup() {
  clearValidation(popupEditProfile, config);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
}

function openNewCardPopup() {
  clearValidation(popupNewPlace, config);
  openPopup(popupPlace);
}

function openImagePopup(cardData) {
  photoPopupPlaceImage.src = cardData.link;
  photoPopupPlaceImage.alt = cardData.name;
  titlePopupPlaceImage.textContent = cardData.name;
  openPopup(popupPlaceImage);
}

function renderProfileInfo(userData) {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function handleEditFormProfile(evt) {
  evt.preventDefault();
  popupEditProfileButton.textContent = 'Сохранение...';
  const newName = nameInput.value;
  const newDescription = descriptionInput.value;
  saveProfileData(newName, newDescription)
  .then(() => {
    profileName.textContent = newName;
    profileDescription.textContent = newDescription;
    closePopup(popupTypeEdit);
    clearValidation(popupEditProfile, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    popupEditProfileButton.textContent = 'Сохранить';
  });
}

function handleUpdateAvatar(evt) {
  evt.preventDefault();
  popupFormUpdateAvatarButton.textContent = 'Сохранение...'
  const avatarData = {
    avatar: popupInputAvatarUrl.value
  }
  saveUserAvatar(avatarData)
  .then(() => {
    profileImage.style.backgroundImage = `url(${popupInputAvatarUrl.value})`;
    closePopup(popupUpdateAvatar);
    popupFormUpdateAvatar.reset();
    clearValidation(popupFormUpdateAvatar, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    popupFormUpdateAvatarButton.textContent = 'Сохранить';
  });
}

function handleNewPlaceSubmit(evt) {
  evt.preventDefault();
  popupNewPlaceButton.textContent = 'Сохранение...'
  const newPlaceCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value
  }
  saveNewPlaceCard(newPlaceCard)
  .then((newCardData) => {
    addNewPlace(newCardData, deleteCard, likeCard, openImagePopup, userId);
    closePopup(popupPlace);
    popupNewPlace.reset();
    clearValidation(popupNewPlace, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
  .finally(() => {
    popupNewPlaceButton.textContent = 'Сохранить';
  });
}

closeButtonList.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', overlayClick);
  button.addEventListener('click', () => closePopup(popup));
})



// popupTypeEdit.addEventListener('mousedown', overlayClick);
popupPlace.addEventListener('mousedown', overlayClick);
popupPlaceImage.addEventListener('mousedown', overlayClick);
popupEditProfile.addEventListener('submit', handleEditFormProfile);
popupNewPlace.addEventListener('submit', handleNewPlaceSubmit);
popupFormUpdateAvatar.addEventListener('submit', handleUpdateAvatar);
editProfileButton.addEventListener('click', openEditProfilePopup);
buttonAddPlace.addEventListener('click', openNewCardPopup);
profileEditAvatarButton.addEventListener('click', openAvatarPopup);

Promise.all([getInitialCards(), getUserInfo()])
.then(([initialCards, userData]) => {
  renderProfileInfo(userData);
  userId = userData._id
  renderCards(initialCards);
})
.catch((error) => {
  console.log(`Ошибка: ${error}`);
})

enableValidation(config);

