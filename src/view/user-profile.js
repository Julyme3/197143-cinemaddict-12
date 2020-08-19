import AbstractView from "./abstract";

export default class UserProfile extends AbstractView {
  constructor(user) {
    super();
    this._user = user;
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
}
