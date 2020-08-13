import {createElement} from "../utils";

export default class FilmList {
  constructor() {
    this._element = null;
  }

  createTemplate() {
    return `<div class="films-list__container"></div>`;
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
