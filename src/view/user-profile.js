import {createElement} from "../utils";

export default class UserProfile {
  constructor(user) {
    this._user = user;
    this._element = null;
  }

  createTemplate(user) {
    const {userRank, imageSrc} = user;

    return `<section class="header__profile profile">
        <p class="profile__rating">${userRank}</p>
        <img class="profile__avatar"
          src="${imageSrc}"
          alt="Avatar"
          width="35" height="35"
        />
      </section>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._user);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
