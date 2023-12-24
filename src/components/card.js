export { createCard, likeCard, deleteCard};
import { deleteCardData, handleRemoveLike, handleSetLike } from '../components/api.js'

const cardTemplate = document.querySelector('#card-template').content;

function cloneCardTemplate () {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

function createCard(cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const cardElement = cloneCardTemplate();
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCountElement = cardElement.querySelector('.card__likes-number');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const isLikedByCurrentUser = cardData.likes.some((like) => like._id === userId);


  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardLikeCountElement.textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;


  if (deleteHandler) {
    cardDeleteButton.addEventListener('click', () => {
      deleteHandler(cardData._id, cardElement);
    });
  }

  if (likeHandler) {
    cardLikeButton.addEventListener('click', function() {
      likeHandler(cardData._id, cardLikeCountElement, cardLikeButton);
    });
  }
  
  if (imageHandler) {
    cardImage.addEventListener('click', function() {
      imageHandler(cardData);
    });
  }
  
  if (isLikedByCurrentUser) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    cardDeleteButton.remove();
  }


  return cardElement;

};

function likeCard(cardId, cardLikeCountElement, cardLikeButton) {
  const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    handleRemoveLike(cardId)
    .then((updatedCard) => {
      cardLikeCountElement.textContent = updatedCard.likes.length;
      cardLikeButton.classList.remove('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  } else {
    handleSetLike(cardId)
    .then((updatedCard) => {
      cardLikeCountElement.textContent = updatedCard.likes.length;
      cardLikeButton.classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }


};

function deleteCard(cardId, cardElement) {
  deleteCardData(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
}