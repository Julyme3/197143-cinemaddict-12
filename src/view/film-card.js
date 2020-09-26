import {formattedDuration, formattedDate} from "../utils/common";
import AbstractView from "./abstract";

const MAX_DESCRIPTION_LENGTH = 140;

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoritesClickHandler = this._addToFavoritesClickHandler.bind(this);
  }

  createTemplate(film) {
    const {title, raiting, release, duration, poster, genres, isFavorite, isToWatchList, isWatched, comments} = film;
    let {description} = film;
    const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
    const watchListActiveClass = isToWatchList ? `film-card__controls-item--active` : ``;
    const watchedActiveClass = isWatched ? `film-card__controls-item--active` : ``;
    const unicodeHorizontalEllipsis = `&#8230;`;

    description = description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 1)}${unicodeHorizontalEllipsis}` : description;

    return `<article class="film-card">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${raiting}</p>
        <p class="film-card__info">
          <span class="film-card__year">${formattedDate(release, `YYYY`)}</span>
          <span class="film-card__duration">${formattedDuration(duration, `h[h] m[m]`)}</span>
          <span class="film-card__genre">${genres[0]}</span>
        </p>
        <img
          src="${poster}"
          alt=""
          class="film-card__poster"
        />
        <p class="film-card__description">${description}</p>
        <a class="film-card__comments">${comments.length} comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListActiveClass}">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedActiveClass}">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
        </form>
      </article>`
    ;
  }

  getTemplate() {
    return this.createTemplate(this._film);
  }

  _openPopupHandler(evt) {
    evt.preventDefault();
    this._callback.openPopup(evt);
  }

  setOpenPopupHandler(callback) {
    this._callback.openPopup = callback;
    this.getElement().addEventListener(`click`, this._openPopupHandler);
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._addToWatchlistClickHandler);
  }

  _addToWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchedlistClick();
  }

  setAddToWatchedClickHandler(callback) {
    this._callback.addToWatchedlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._addToWatchedClickHandler);
  }

  _addToFavoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  }

  setAddToFavoritesClickHandler(callback) {
    this._callback.addToFavoritesClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._addToFavoritesClickHandler);
  }
}
