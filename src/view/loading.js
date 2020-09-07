import AbstractView from "./abstract.js";

export default class Loading extends AbstractView {
  createLoadingTemplate() {
    return `<h2 class="films-list__title">Loading...</h2>`;
  }

  getTemplate() {
    return this.createLoadingTemplate();
  }
}
