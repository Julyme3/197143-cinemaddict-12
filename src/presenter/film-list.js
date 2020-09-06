import {render, remove} from "../utils/render";
import {sortByDateDown, sortByRatingDown} from "../utils/film";
import {SortTypes, UserAction, UpdateType} from "../const";
import {filter} from "../utils/filter";
import FilmContainerView from "../view/film-container";
import NoFilmView from "../view/no-film";
import LoadMoreBtnView from "../view/load-more-btn";
import SortView from "../view/sort";
import FilmListView from "../view/film-list";
// import ExtraFilmContainerView from "../view/extra-film";
import FilmPresenter from "../presenter/film";

const FILM_COUNT_GAP = 5;
// const EXTRA_FILM_CARD_COUNT = 2;

export default class FilmList {
  constructor(container, filmsModel, filterModel) {
    this._filmListContainer = container;
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._filmListInnerContainerComponent = new FilmContainerView();
    this._noFilmComponent = new NoFilmView();
    this._loadMoreBtnComponent = null;
    this._filmListComponent = new FilmListView();
    this._sortComponent = null;

    this._currentSortType = SortTypes.DEFAULT;
    this._filmPresenter = {};

    this._filmListElement = this._filmListInnerContainerComponent.getElement().querySelector(`.films-list`);
    this._renderedCardsCount = FILM_COUNT_GAP;
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleChangeModeFilm = this._handleChangeModeFilm.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._filmListContainer, this._filmListInnerContainerComponent, `beforeend`);
    this._renderBoard();
  }

  _getFilms() {
    const currentFilterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms();
    const filteredFilms = filter[currentFilterType](films);

    switch (this._currentSortType) {
      case SortTypes.DATE:
        return filteredFilms.sort(sortByDateDown);
      case SortTypes.RATING:
        return filteredFilms.sort(sortByRatingDown);
    }

    return filteredFilms;
  }

  _renderFilmCard(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction, this._handleChangeModeFilm, this._filmsModel);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _handleSortTypeChange(sortType) {
    if (sortType === this._currentSortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard();
    this._renderBoard();
  }

  _handleLoadMoreButtonClick() {
    const filmsCount = this._getFilms().length;
    const films = this._getFilms().slice(this._renderedCardsCount, this._renderedCardsCount + FILM_COUNT_GAP);
    this._renderFilmCards(films);

    this._renderedCardsCount += FILM_COUNT_GAP;

    if (this._renderedCardsCount >= filmsCount) {
      this._loadMoreBtnComponent.removeBtnClickHandler();
      remove(this._loadMoreBtnComponent);
    }
  }

  _handleViewAction(actionType, updateType, updated) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, updated);
        break;
    }
  }

  _handleModelEvent(updateType, updated) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._filmPresenter[updated.id].init(updated);
        break;
      case UpdateType.MINOR:
        this._clearBoard();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedTaskCount: true, resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _handleChangeModeFilm() {
    Object.values(this._filmPresenter).forEach((filmPresenter) => filmPresenter.resetView());
  }

  _renderFilmCards(films, container = this._filmListComponent) {
    films.forEach((film) => this._renderFilmCard(container, film));
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    render(this._filmListInnerContainerComponent, this._sortComponent, `afterbegin`);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderLoadMoreBtn() {
    if (this._loadMoreBtnComponent !== null) {
      this._loadMoreBtnComponent = null;
    }

    this._loadMoreBtnComponent = new LoadMoreBtnView();
    render(this._filmListElement, this._loadMoreBtnComponent, `beforeend`);

    this._loadMoreBtnComponent.setBtnClickHandler(this._handleLoadMoreButtonClick);
  }

  // _renderExtraFilms(extraContainer) {
  //   render(this._filmListInnerContainerComponent, extraContainer, `beforeend`);
  //   const extraFilmList = extraContainer.getElement().querySelector(`.films-list__container`);

  //   this._renderFilmCards(0, EXTRA_FILM_CARD_COUNT, extraFilmList);
  // }

  // _renderFilmList() { // только основная часть списка фильмов (без экстра блока)
  //   const filmsCount = this._getFilms().length;
  //   this._renderFilmCards(0, Math.min(FILM_COUNT_GAP, filmsCount));

  //   if (filmsCount > FILM_COUNT_GAP) {
  //     this._renderLoadMoreBtn();
  //   }

  // }

  _renderBoard() {
    const filmsCount = this._getFilms().length;

    if (!filmsCount) {
      this._filmListElement.innerHTML = this._noFilmComponent.getTemplate();
      return;
    }

    this._renderSort();
    render(this._filmListElement, this._filmListComponent, `beforeend`);

    const films = this._getFilms().slice(0, Math.min(this._renderedCardsCount, filmsCount));
    this._renderFilmCards(films);

    if (filmsCount > this._renderedCardsCount) {
      this._renderLoadMoreBtn();
    }

  //  this._renderExtraFilms(new ExtraFilmContainerView());
  // this._renderExtraFilms(new ExtraFilmContainerView());
  }

  _clearBoard({resetRenderedTaskCount = false, resetSortType = false} = {}) {
    const filmsCount = this._getFilms().length;

    Object.values(this._filmPresenter)
      .forEach((filmPresenter) => filmPresenter.destroy());
    this._filmPresenter = {};

    remove(this._loadMoreBtnComponent);
    remove(this._sortComponent);
    remove(this._noFilmComponent);

    if (resetRenderedTaskCount) {
      this._renderedCardsCount = FILM_COUNT_GAP; // сбрасываем кол-во отрисованных страниц до максимального по умолчанию
    } else {
      this._renderedCardsCount = Math.min(filmsCount, this._renderedCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortTypes.DEFAULT;
    }
  }
}
