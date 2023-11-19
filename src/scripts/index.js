import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openPopup, overlayClick, closePopup } from '../components/modal.js';

// Список всех картинок
const placesItem = document.querySelector(".places__list"); // лист со всеми картинками

// Попапы
const popupEditProfile = document.querySelector('.popup_type_edit');//Попап редактирования профиля
const popupPlace = document.querySelector(".popup_type_new-card"); // попап добавления нового места
const popupPlaceImage = document.querySelector('.popup_type_image'); // попап открытой картинки
const popupImage = popupPlaceImage.querySelector(".popup__image"); // попап картинки
const popupImageTitle = popupPlaceImage.querySelector(".popup__caption"); // подпись картинки

// Кнопки
const editProfileButton = document.querySelector('.profile__edit-button'); // кнопка редактирования профиля
const buttonAddPlace = document.querySelector('.profile__add-button'); // кнопка добавления места
const closeButton = document.querySelectorAll(".popup__close"); // Кнопка закрытия для всех попапов

// Форма: Профиль
const profileFormElement = popupEditProfile.querySelector('.popup__form'); // форма: название, описание, кнопка
const profileDescription = document.querySelector(".profile__description"); //отображаемое описание
const descriptionInput = document.querySelector('.popup__input_type_description'); // Инпут поля описания
const nameInput = profileFormElement.querySelector(".popup__input_type_name"); // инпут имени
const profileName = document.querySelector(".profile__title"); //отображаемое имя


// Форма: Место
const addFormElement = popupPlace.querySelector('.popup__form');// форма добавления карточки
const cardNameInput = addFormElement.querySelector('.popup__input_type_card-name'); // инпут названия
const cardUrlInput = addFormElement.querySelector('.popup__input_type_url'); // инпут поля ссылки на изображение



// Добавление карточки в список
function renderCard(info, list) {
  list.prepend(createCard(info, deleteCard, likeCard, openImagePopup));
};

// Отображение карточек из массива
initialCards.forEach((elements) => {
  renderCard(elements, placesItem)
});

// Открытие карточки
function openImagePopup(image) {
  popupImage.src = image.target.src;
  popupImageTitle.textContent = image.target.alt;
  popupImage.alt = image.target.alt;
  openPopup(popupPlaceImage);
};


// Редактирование профиля: обработчик «отправки» формы 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEditProfile); // попап закроется по клику на кнопку сохранения 
};
profileFormElement.addEventListener("submit", handleProfileFormSubmit);


// Функция создания нового места из формы 
function handleAddPlace(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };
  renderCard(newCard, placesItem);
  closePopup(popupPlace);
  evt.target.reset()
};
addFormElement.addEventListener("submit", handleAddPlace);

//Открытие попапа добавления места по клику на +
buttonAddPlace.addEventListener("click", () => {
  openPopup(popupPlace);
});


//Открытие попапа редактирования профиля по клику на карандаш
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});


closeButton.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

popupEditProfile.addEventListener('mousedown', overlayClick);
popupPlace.addEventListener('mousedown', overlayClick);
popupPlaceImage.addEventListener('mousedown', overlayClick);
