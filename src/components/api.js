


const api = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-2',
    headers: {
      authorization: 'ad74ce3d-d2bb-4602-8806-87fae1ae385c',
      'Content-Type': 'application/json',
    },
  };
  
  
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
 
  function getUserInfo() {
    return fetch(`${api.baseUrl}/users/me`, {
      method: 'GET',
      headers: api.headers
    })
    .then(res => checkResponse(res))
  }
  
  
  function getInitialCards() {
    return fetch(`${api.baseUrl}/cards`, {
      method: 'GET',
      headers: api.headers
    })
    .then(res => checkResponse(res))
  }
   
  
  function saveProfileData(newName, newDescription) {
    return fetch(`${api.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: api.headers,
      body: JSON.stringify({
        name: newName,
        about: newDescription
      })
    })
    .then(res => checkResponse(res))
  }
  
  
   function saveNewPlaceCard(cardData) {
    return fetch(`${api.baseUrl}/cards`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(cardData)
    })
    .then(res => checkResponse(res))
  }
  
 
  function handleSetLike(cardId) {
    return fetch(`${api.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: api.headers,
    })
    .then(res => checkResponse(res))
  }
  
  function handleRemoveLike(cardId) {
    return fetch(`${api.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: api.headers,
    })
    .then(res => checkResponse(res))
  }
  
  
   function deleteCardData(cardId) {
    return fetch(`${api.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: api.headers,
    })
    .then(res => checkResponse(res))
  }
  
  function saveUserAvatar(avatarData) {
    return fetch(`${api.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: api.headers,
      body: JSON.stringify(avatarData)
    })
    .then(res => checkResponse(res))
  }


  export { getUserInfo, getInitialCards, saveProfileData, saveNewPlaceCard, handleSetLike, handleRemoveLike, deleteCardData, saveUserAvatar };