import {createElement} from "../utils";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  createItemTemplate(filter, isActive) {
    const MAX_COUNT = 5;

    return `<a href="#watchlist" class="main-navigation__item main-navigation__item-${isActive}">${filter.title}
        ${(filter.title === `All movies` || filter.count > MAX_COUNT) ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`}
      </a>`
    ;
  }

  createTemplate(filters) {
    return `<div class="main-navigation__items">
        ${filters.map((filter, index) => this.createItemTemplate(filter, index === 0)).join(``)}
      </div>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._filters);
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
