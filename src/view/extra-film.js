import AbstractView from "./abstract";

export default class ExtraFilm extends AbstractView {

  createTemplate() {
    return `<section class="films-list--extra">
        <h2 class="films-list__title">Top rated</h2>
        <div class="films-list__container"></div>
      </section>`
    ;
  }

  getTemplate() {
    return this.createTemplate();
  }

}
