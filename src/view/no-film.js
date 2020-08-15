import {createElement} from "../utils";

export default class NoFilm {
  constructor() {
    this._element = null;
  }

  createTemplate() {
    return `<h2 class="films-list__title">There are no movies in our database</h2>`;
  }

  getTemplate() {
    return this.createTemplate();
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
