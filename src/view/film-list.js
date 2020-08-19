import AbstractView from "./abstract";

export default class FilmList extends AbstractView {

  createTemplate() {
    return `<div class="films-list__container"></div>`;
  }

  getTemplate() {
    return this.createTemplate();
  }

}
