import AbstractView from "./abstract";

export default class Filter extends AbstractView {
  constructor(filters, activeFilterType) {
    super();
    this._activeFilterType = activeFilterType;
    this._filters = filters;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  createItemTemplate({type, title, count}) {
    const showCount = title !== `All movies`;

    return `<a href="#watchlist" class="main-navigation__item ${type === this._activeFilterType ? `main-navigation__item-active` : ``}" data-filter-type="${type}">${title}
        ${showCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}
      </a>`
    ;
  }

  createTemplate(filters) {
    return `<div class="main-navigation__items">
        ${filters.map((filter) => this.createItemTemplate(filter)).join(``)}
      </div>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._filters);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName === `A`) {
      this._callback.filterTypeChange(evt.target.dataset.filterType);
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
