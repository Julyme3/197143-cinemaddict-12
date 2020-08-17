import {render, removeChild, appendChild, remove} from "../utils/render";
import FilmContainerView from "../view/film-container";
import NoFilmView from "../view/no-film";
import FilmCardView from "../view/card";
import FilmPopupView from "../view/film-popup";
import LoadMoreBtnView from "../view/load-more-btn";
import FilmListView from "../view/film-list";
import ExtraFilmContainerView from "../view/extra-film";

const body = document.querySelector(`body`);
const FILM_COUNT_GAP = 5;
const EXTRA_FILM_CARD_COUNT = 2;

export default class FilmList {
  constructor(container) {
    this._filmListContainer = container;
    this._filmListInnerContainerComponent = new FilmContainerView();
    this._noFilmComponent = new NoFilmView();
    this._loadMoreBtnComponent = new LoadMoreBtnView();
    this._filmListComponent = new FilmListView();

    this._filmListElement = this._filmListInnerContainerComponent.getElement().querySelector(`.films-list`);
    this._renderedCardsCount = FILM_COUNT_GAP;
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = films;
    render(this._filmListContainer, this._filmListInnerContainerComponent, `beforeend`);
    this._renderFilmList(films);
  }

  _renderFilmCard(container, film) {
    const filmCardComponent = new FilmCardView(film);
    const filmPopupComponent = new FilmPopupView(film);

    render(container, filmCardComponent, `beforeend`);

    const closePopup = () => {
      removeChild(filmPopupComponent);
    };

    const openPopup = () => {
      appendChild(body, filmPopupComponent);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
        document.removeEventListener(`keydown`, escKeyDownHandler);
        filmPopupComponent.removeClosePopupHandler();
      }
    };

    const closePopupHandler = () => {
      closePopup();
      filmPopupComponent.removeClosePopupHandler();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    };

    const openPopupHandler = (evt) => {
      if (evt.target.className !== `film-card__poster`
      && evt.target.className !== `film-card__title`
      && evt.target.className !== `film-card__comments`) {
        return;
      }

      openPopup();

      document.addEventListener(`keydown`, escKeyDownHandler);
      filmPopupComponent.setClosePopupHandler(closePopupHandler);
    };

    filmCardComponent.setOpenPopupHandler(openPopupHandler);
  }

  _renderFilmCards(from, to, container = this._filmListComponent) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilmCard(container, film));
  }

  _handleLoadMoreButtonClick() {
    this._renderFilmCards(this._renderedCardsCount, this._renderedCardsCount + FILM_COUNT_GAP);
    this._renderedCardsCount += FILM_COUNT_GAP;

    if (this._renderedCardsCount >= this._films.length) {
      this._loadMoreBtnComponent.removeBtnClickHandler();
      remove(this._loadMoreBtnComponent);
    }
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

  _renderFilmList(films) {
    if (!films.length) {
      this._filmListElement.innerHTML = this._noFilmComponent.getTemplate();
      return;
    }

    render(this._filmListElement, this._filmListComponent, `beforeend`);
    this._renderFilmCards(0, Math.min(FILM_COUNT_GAP, this._films.length));

    if (films.length > FILM_COUNT_GAP) {
      this._renderLoadMoreBtn();
    }

    this._renderExtraFilms(new ExtraFilmContainerView());
    this._renderExtraFilms(new ExtraFilmContainerView());
  }
}
