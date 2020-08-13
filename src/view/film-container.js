import {createElement} from "../utils";

export default class FilmContainer {

  constructor() {
    this._element = null;
  }

  createTemplate() {
    return `<section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
        </section>
      </section>`
    ;
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
