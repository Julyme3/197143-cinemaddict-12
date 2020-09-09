import AbstractView from "./abstract";

export default class UserProfile extends AbstractView {
  constructor(userRank) {
    super();
    this._userRank = userRank;
  }

  createTemplate() {
    return `<section class="header__profile profile">
        <p class="profile__rating">${this._userRank}</p>
        <img class="profile__avatar"
          src="images/bitmap.png"
          alt="Avatar"
          width="35" height="35"
        />
      </section>`
    ;
  }

  getTemplate() {
    return this.createTemplate();
  }
}
