import {render, removeChild, appendChild, remove, replace} from "../utils/render";
import {UserAction, UpdateType, AUTHORIZATION, END_POINT} from "../const.js";
import FilmCardView from "../view/card";
import FilmPopupView from "../view/film-popup";
import CommentsPresenter from "./comments";
import CommentsModel from "../model/comments";
import Api from "../api";

const body = document.querySelector(`body`);

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Film {
  constructor(container, changeData, changeMode, handleAfterClosePopup) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._api = new Api(END_POINT, AUTHORIZATION);
    this._mode = Mode.DEFAULT;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._commentsContainer = null;
    this._commentsModel = new CommentsModel();
    this._commentsPresenter = null;
    this._needRerender = false;
    this._handleAfterClosePopup = handleAfterClosePopup;

    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._handleClickAddToWatchlist = this._handleClickAddToWatchlist.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClickAddToWatched = this._handleClickAddToWatched.bind(this);
    this._handleClickAddToFavorites = this._handleClickAddToFavorites.bind(this);
    this._handleAfterClosePopup = this._handleAfterClosePopup.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmPopupComponent = new FilmPopupView(film);

    this._api.getItems(`comments/${this._film.id}`, CommentsModel)
      .then((comments) => this._commentsModel.setComments(UpdateType.INIT, comments))
      .catch(() => this._commentsModel.setComments(UpdateType.INIT, [])); // получаем список комментариев

    this._filmCardComponent.setOpenPopupHandler(this._openPopupHandler);
    this._filmCardComponent.setAddToWatchlistClickHandler(this._handleClickAddToWatchlist);
    this._filmCardComponent.setAddToWatchedClickHandler(this._handleClickAddToWatched);
    this._filmCardComponent.setAddToFavoritesClickHandler(this._handleClickAddToFavorites);

    this._filmPopupComponent.setClosePopupHandler(this._closePopupHandler);
    this._filmPopupComponent.setAddToWatchlistClickHandler(this._handleClickAddToWatchlist);
    this._filmPopupComponent.setAddToWatchedClickHandler(this._handleClickAddToWatched);
    this._filmPopupComponent.setAddToFavoritesClickHandler(this._handleClickAddToFavorites);

    this._commentsContainer = this._filmPopupComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentsPresenter = new CommentsPresenter(this._commentsContainer, this._commentsModel, this._film);
    this._commentsPresenter.init();

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._container, this._filmCardComponent, `beforeend`);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (body.contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  _closePopup() {
    removeChild(this._filmPopupComponent);
    this._commentsPresenter.destroy();
    this._commentsPresenter = null;
    this._mode = Mode.DEFAULT;
    if (this._needRerender) {
      this._handleAfterClosePopup();
      this._needRerender = false;
    }
  }

  _openPopup() {
    appendChild(body, this._filmPopupComponent);
    if (!this._commentsPresenter) {
      this._commentsPresenter = new CommentsPresenter(this._commentsContainer, this._commentsModel);
      this._commentsPresenter.init();
    }

    this._changeMode();
    this._mode = Mode.POPUP;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closePopup();
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
      this._filmPopupComponent.removeClosePopupHandler();
    }
  }

  _closePopupHandler() {
    this._closePopup();
    this._filmPopupComponent.removeClosePopupHandler();
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _openPopupHandler(evt) {
    if (evt.target.className !== `film-card__poster`
    && evt.target.className !== `film-card__title`
    && evt.target.className !== `film-card__comments`) {
      return;
    }

    this._openPopup();
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._filmPopupComponent.setClosePopupHandler(this._closePopupHandler);
  }

  _handleClickAddToWatchlist() {
    const isMinorUpdate = this._mode === Mode.DEFAULT;
    if (!isMinorUpdate) {
      this._needRerender = true;
    }

    this._changeData(
        UserAction.UPDATE_FILM,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        Object.assign({},
            this._film,
            {
              isToWatchList: !this._film.isToWatchList
            }
        ));
  }

  _handleClickAddToWatched() {
    const isMinorUpdate = this._mode === Mode.DEFAULT;
    if (!isMinorUpdate) {
      this._needRerender = true;
    }
    this._changeData(
        UserAction.UPDATE_FILM,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        Object.assign({},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        ));
  }

  _handleClickAddToFavorites() {
    const isMinorUpdate = this._mode === Mode.DEFAULT;
    if (!isMinorUpdate) {
      this._needRerender = true;
    }
    this._changeData(
        UserAction.UPDATE_FILM,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        Object.assign({},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        ));
  }

  resetView() {
    if (this._mode === Mode.POPUP) {
      this._closePopup();
    }
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmPopupComponent);
  }
}
