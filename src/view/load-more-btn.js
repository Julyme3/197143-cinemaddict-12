import {createElement} from "../utils";

export default class LoadMoreBtn {

  constructor() {
    this._element = null;
  }

  createTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
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
