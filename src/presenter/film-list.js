import {render, remove} from "../utils/render";
import {sortByDateDown, sortByRatingDown, updateItem} from "../utils/film";
import {SortTypes} from "../const";
import FilmContainerView from "../view/film-container";
import NoFilmView from "../view/no-film";
import LoadMoreBtnView from "../view/load-more-btn";
import SortView from "../view/sort";
import FilmListView from "../view/film-list";
// import ExtraFilmContainerView from "../view/extra-film";
import FilmPresenter from "../presenter/film";

const body = document.querySelector(`body`);
const mainElement = body.querySelector(`.main`);
const FILM_COUNT_GAP = 5;
const EXTRA_FILM_CARD_COUNT = 2;

export default class FilmList {
  constructor(container) {
    this._filmListContainer = container;
    this._filmListInnerContainerComponent = new FilmContainerView();
    this._noFilmComponent = new NoFilmView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();
    this._filmListComponent = new FilmListView();
    this._sortComponent = new SortView();

    this._currentSortType = SortTypes.DEFAULT;
    this._filmPresenter = {};

    this._filmListElement = this._filmListInnerContainerComponent.getElement().querySelector(`.films-list`);
    this._renderedCardsCount = FILM_COUNT_GAP;
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleChangeModeFilm = this._handleChangeModeFilm.bind(this);
  }

  init(films) {
    this._films = films;
    this._renderSort();
    render(this._filmListContainer, this._filmListInnerContainerComponent, `beforeend`);
    this._renderBoard();
    this._sourcedFilms = this._films.slice(); // храним исходную копию массива с фильмами
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange, this._handleChangeModeFilm);
    filmPresenter.init(film);

    this._filmPresenter[film.id] = filmPresenter;
  }

  _filmsSort(sortType) {
    switch (sortType) {
      case SortTypes.DATE:
        this._films.sort(sortByDateDown);
        break;
      case SortTypes.RATING:
        this._films.sort(sortByRatingDown);
        break;
      default:
        this._films = this._sourcedFilms.slice();
        break;
    }
    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }
    this._filmsSort(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this._renderedCardsCount, this._renderedCardsCount + FILM_COUNT_GAP);
    this._renderedCardsCount += FILM_COUNT_GAP;

    if (this._renderedCardsCount >= this._films.length) {
      this._loadMoreBtnComponent.removeBtnClickHandler();
      remove(this._loadMoreBtnComponent);
    }
  }

  _handleFilmChange(updated) {
    this._films = updateItem(this._films, updated);
    this._sourcedFilms = updateItem(this._sourcedFilms, updated);

    this._filmPresenter[updated.id].init(updated);
  }

  _handleChangeModeFilm() {
    Object.values(this._filmPresenter).forEach((filmPresenter) => filmPresenter.resetView());
  }

  _renderFilmCards(from, to, container = this._filmListComponent) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilmCard(container, film));
  }

  _renderSort() {
    render(mainElement, this._sortComponent, `beforeend`);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderLoadMoreBtn() {
    render(this._filmListElement, this._loadMoreBtnComponent, `beforeend`);

    this._loadMoreBtnComponent.setBtnClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderExtraFilms(extraContainer) {
    render(this._filmListInnerContainerComponent, extraContainer, `beforeend`);
    const extraFilmList = extraContainer.getElement().querySelector(`.films-list__container`);

    this._renderFilmCards(0, EXTRA_FILM_CARD_COUNT, extraFilmList);
  }

  _renderFilmList() { // только основная часть списка фильмов (без экстра блока)
    render(this._filmListElement, this._filmListComponent, `beforeend`);
    this._renderFilmCards(0, Math.min(FILM_COUNT_GAP, this._films.length));

    if (this._films.length > FILM_COUNT_GAP) {
      this._renderLoadMoreBtn();
    }

  }

  _renderBoard() {
    if (!this._films.length) {
      this._filmListElement.innerHTML = this._noFilmComponent.getTemplate();
      return;
    }

    this._renderFilmList();

  //  this._renderExtraFilms(new ExtraFilmContainerView());
  // this._renderExtraFilms(new ExtraFilmContainerView());
  }

  _clearFilmList() {
    Object.values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());
    this._renderedCardsCount = FILM_COUNT_GAP;
  }

}
