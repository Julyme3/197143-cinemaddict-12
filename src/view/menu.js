import AbstractView from "./abstract";

export default class Menu extends AbstractView {

  createTemplate() {
    return `<nav class="main-navigation">
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>`
    ;
  }

  getTemplate() {
    return this.createTemplate();
  }
}
