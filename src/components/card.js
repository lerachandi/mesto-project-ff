export { createCard, likeCard, deleteCard};

// Функция создания карточки
function createCard(cardData, deleteCard, likeCard, openPopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardImage.alt = `Фотография ${cardData.name}`;
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', likeCard);
  cardImage.addEventListener('click', openPopup);

  return cardElement;

};

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
};

function deleteCard(event) {
  const cardItem = event.target.closest(".places__item");
  cardItem.remove();
};