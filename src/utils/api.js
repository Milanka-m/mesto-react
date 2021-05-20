class Api {
  constructor({ address, token, groupID }) {
    this._address = address;
    this._token = token;
    this._groupID = groupID;
  }

  //публичный метод, который получает информацию о пользователе с сервера
  getUsers() {
    return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then((response) => {
         if (response.ok) {
         // если ответ сервера 200, возвращаются данные
         return response.json();
      }
        // иначе возвращаем промис с ошибкой
       return Promise.reject(`Ошибка ${response.status}`);
    });
  }

  // метод, который отправляет запрос на сервер для загрузки карточек
  getCards() {
    return fetch(`${this._address}/v1/${this._groupID}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then((response) => {
        if(response.ok) {
         return response.json();
       }
        return Promise.reject(`Ощибка ${response.status}`);
      });
  }

  // метод, который отправляет запрос на сервер для редактирования данных профиля
  editUser(data) {
    return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then((response) => {
       if(response.ok) {
         return response.json();
       }
        return Promise.reject(`Ощибка ${response.status}`);
      });
  }

  // метод добавления карточки на сервер
  addCard(data) {
    return fetch(`${this._address}/v1/${this._groupID}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((response) => {
        if(response.ok) {
          return response.json();
       }
       return Promise.reject(`Ощибка ${response.status}`);
      });
  }

  // метод удаления карточки
  removeCard(id) {
    return fetch(`${this._address}/v1/${this._groupID}/cards/${id}`, {
      method: 'DELETE',
      headers: {
          authorization: this._token
      }
    })
      .then((response) => {
        if(response.ok) {
          return Promise.resolve('success');
        }
        return Promise.reject(`Ощибка ${response.status}`);
      })

  } 

  addLikeCard(id) {
    return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${id}`, {
      method: 'PUT',
      headers: {
        authorization: this._token
      }
    })
      .then((response) => {
        if(response.ok) {
          return response.json();
       }
       return Promise.reject(`Ощибка ${response.status}`);
    });
  }

  removeLikeCard(id) {
    return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then((response) => {
        if(response.ok) {
          return response.json();
       }
       return Promise.reject(`Ощибка ${response.status}`);
    });
  }

  editAvatar({avatar}) { 
    return fetch(`${this._address}/v1/${this._groupID}/users/me/avatar`, { 
      method: 'PATCH', 
      headers: { 
        authorization: this._token, 
        'Content-type': 'application/json' 
      }, 
      body: JSON.stringify({ 
        avatar: avatar, 
      }) 
    }) 
      .then((response) => {  
        if(response.ok) {  
          return response.json();  
       }  
       return Promise.reject(`Ощибка ${response.status}`);  
      });  
  } 
 

}

const api = new Api({
  address: 'https://mesto.nomoreparties.co',
  token: '6db4154b-d992-4850-8211-1b620ba1fb44',
  groupID: 'cohort-22'
});

export default api;