
export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(endpoint, { method, body }) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      method: method,
      body: body,
    }).then((res) => this._checkResponse(res));
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  /**************************************************************************
   *                           GET INITIAL CARDS                            *
   **************************************************************************/
  getInitialCards() {
    return this._request(`/cards`, {});
  }

  /**************************************************************************
   *                             GET USER INFO                              *
   **************************************************************************/
  getUserInfo() {
    return this._request(`/users/me`, {
      about: "about",
      avatar: "avatar",
      name: "name",
      _id: "9ad20f72db0274ca5ee20ecb",
    });
  }

  /**************************************************************************
   *                             SET USER INFO                              *
   **************************************************************************/
  setUserInfo({ name, about }) {
    return this._request(`/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  /**************************************************************************
   *                               SET AVATAR                               *
   **************************************************************************/
  setUserAvatar(url) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: url,
      }),
    });
  }

  /**************************************************************************
   *                              UPLOAD CARD                               *
   **************************************************************************/
  uploadCard({ name, link }) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  /**************************************************************************
   *                              DELETE CARD                               *
   **************************************************************************/

  deleteCard({ cardId }) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  /**************************************************************************
   *                       ADDING AND REMOVING LIKES                        *
   **************************************************************************/
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._checkResponse);
  }
}
