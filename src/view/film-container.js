import AbstractView from "./abstract";

export default class FilmContainer extends AbstractView {

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
}
