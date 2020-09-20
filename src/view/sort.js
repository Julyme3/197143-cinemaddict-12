import {SortType} from "../const";
import AbstractView from "./abstract";

export default class Sort extends AbstractView {
  constructor(activeSortType) {
    super();
    this._activeSortType = activeSortType;
    this._changeSortTypeHandler = this._changeSortTypeHandler.bind(this);
  }

  createTemplate(activeSortType) {
    return `<ul class="sort">
        <li><a href="#" class="sort__button ${SortType.DEFAULT === activeSortType ? `sort__button--active` : ``}" data-sort-type="default">Sort by default</a></li>
        <li><a href="#" class="sort__button ${SortType.DATE === activeSortType ? `sort__button--active` : ``}" data-sort-type="date">Sort by date</a></li>
        <li><a href="#" class="sort__button ${SortType.RATING === activeSortType ? `sort__button--active` : ``}" data-sort-type="rating">Sort by rating</a></li>
      </ul>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._activeSortType);
  }

  _changeSortTypeHandler(evt) {
    evt.preventDefault();
    this._callback.changeSortType(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.changeSortType = callback;
    this.getElement().addEventListener(`click`, this._changeSortTypeHandler);
  }
}
