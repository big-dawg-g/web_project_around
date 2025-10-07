export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getCompleteData() {
    return Promise.all([this.getUserData(), this.getCards()]);
  }

  updateUserInfo(newUserName, newUserJob) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newUserName,
        about: newUserJob,
      }),
    }).then(this._handleResponse);
  }

  updateUserAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    }).then(this._handleResponse);
  }

  sendCardData(name, link) {
    return fetch(`${this._url}/cards/`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  addLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  removeLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}
