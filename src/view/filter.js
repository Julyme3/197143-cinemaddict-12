import AbstractView from "./abstract";

export default class Filter extends AbstractView {
  constructor(filters, activeFilterType) {
    super();
    this._activeFilterType = activeFilterType;
    this._filters = filters;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  createItemTemplate(filter, activeFilterType) {
    const {type, title, count} = filter;
    const MAX_COUNT = 5;
    const showCount = count <= MAX_COUNT && title !== `All movies`;

    return `<a href="#watchlist" class="main-navigation__item ${type === activeFilterType ? `main-navigation__item-active` : ``}" data-filter-type="${type}">${title}
        ${showCount ? `<span class="main-navigation__item-count">${count}</span>` : ``}
      </a>`
    ;
  }

  createTemplate(filters, activeFilterType) {
    return `<div class="main-navigation__items">
        ${filters.map((filter) => this.createItemTemplate(filter, activeFilterType)).join(``)}
      </div>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._filters, this._activeFilterType);
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
