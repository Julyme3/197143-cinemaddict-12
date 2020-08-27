import {render, removeChild, appendChild, remove, replace} from "../utils/render";
import FilmCardView from "../view/card";
import FilmPopupView from "../view/film-popup";
import NewCommentView from "../view/new-comment";

const body = document.querySelector(`body`);

const Mode = {
  DEFAULT: `DEFAULT`,
  POPUP: `POPUP`
};

export default class Film {
  constructor(container, changeData, changeMode) {
    this._container = container;
    this._filmCardComponent = null;
    this._filmPopupComponent = null;
    this._newCommentComponent = null;
    this._mode = Mode.DEFAULT;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._handleClickAddToWatchlist = this._handleClickAddToWatchlist.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleClickAddToWatched = this._handleClickAddToWatched.bind(this);
    this._handleClickAddToFavorites = this._handleClickAddToFavorites.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCardComponent;
    const prevFilmPopupComponent = this._filmPopupComponent;
    this._filmCardComponent = new FilmCardView(film);
    this._filmPopupComponent = new FilmPopupView(film);
    this._newCommentComponent = new NewCommentView();
    this._filmCardComponent.setOpenPopupHandler(this._openPopupHandler);
    this._filmCardComponent.setAddToWatchlistClickHandler(this._handleClickAddToWatchlist);
    this._filmCardComponent.setAddToWatchedClickHandler(this._handleClickAddToWatched);
    this._filmCardComponent.setAddToFavoritesClickHandler(this._handleClickAddToFavorites);

    this._filmPopupComponent.setClosePopupHandler(this._closePopupHandler);
    this._filmPopupComponent.setAddToWatchlistClickHandler(this._handleClickAddToWatchlist);
    this._filmPopupComponent.setAddToWatchedClickHandler(this._handleClickAddToWatched);
    this._filmPopupComponent.setAddToFavoritesClickHandler(this._handleClickAddToFavorites);

    const newCommentContainer = this._filmPopupComponent.getElement().querySelector(`.film-details__comments-wrap`);

    if (prevFilmComponent === null || prevFilmPopupComponent === null) {
      render(this._container, this._filmCardComponent, `beforeend`);
      appendChild(newCommentContainer, this._newCommentComponent);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    if (body.contains(prevFilmPopupComponent.getElement())) {
      replace(this._filmPopupComponent, prevFilmPopupComponent);
      appendChild(newCommentContainer, this._newCommentComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmPopupComponent);
  }

  _closePopup() {
    removeChild(this._filmPopupComponent);
    this._mode = Mode.DEFAULT;
    this._newCommentComponent.reset();
  }

  _openPopup() {
    appendChild(body, this._filmPopupComponent);
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
    this._changeData(Object.assign({},
        this._film,
        {
          isToWatchList: !this._film.isToWatchList
        }
    ));
  }

  _handleClickAddToWatched() {
    this._changeData(Object.assign({},
        this._film,
        {
          isWatched: !this._film.isWatched
        }
    ));
  }

  _handleClickAddToFavorites() {
    this._changeData(Object.assign({},
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
