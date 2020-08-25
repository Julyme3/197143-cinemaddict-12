import {formattedDate} from "../utils/common";
import SmartView from "./smart";
import {generateComment} from "../mock/comment";
import CommentsView from "./comments";

export default class FilmPopup extends SmartView {
  constructor(film) {
    super();
    this._film = film;
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
    this._addToWatchedClickHandler = this._addToWatchedClickHandler.bind(this);
    this._addToFavoritesClickHandler = this._addToFavoritesClickHandler.bind(this);
  }

  createGenresTemplate(genres) {
    return `<tr class="film-details__row">
      <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
      <td class="film-details__cell">
        ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
      </tr>`
    ;
  }

  createDetailsTemplate(film) {
    const {title, originalTitle, raiting, country, director, writers, actors, release, duration, poster, genres, description, ageRaiting} = film;
    const genresTemplate = this.createGenresTemplate(genres);

    return `<div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img"
          src="./images/posters/${poster}"
          alt=""
          />
          <p class="film-details__age">${ageRaiting}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${raiting}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tbody>
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${formattedDate(release, {days: `numeric`, month: `long`, year: `numeric`})}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${duration}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              ${genresTemplate}
            </tbody>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>`
    ;
  }

  createBtnControlsTemplate(isFavorite, isToWatchList, isWatched) {
    return `<section class="film-details__controls">
        <input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="watchlist"
        name="watchlist"
        ${isToWatchList ? `checked` : ``}
        />
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="watched"
        name="watched"
        ${isWatched ? `checked` : ``}
        />
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input
        type="checkbox"
        class="film-details__control-input visually-hidden"
        id="favorite"
        name="favorite"
        ${isFavorite ? `checked` : ``}
        />
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>`
    ;
  }

  createFilmPopupTemplate(film) {
    const {isFavorite, isToWatchList, isWatched, comments} = film;
    const detailsTemplate = this.createDetailsTemplate(film);
    const btnControlsTemplate = this.createBtnControlsTemplate(isFavorite, isToWatchList, isWatched);
    const commentsTemplate = new CommentsView(new Array(comments).fill().map(generateComment)).getTemplate();

    return `<section class="film-details">
        <form class="film-details__inner" action="" method="get">
          <div class="form-details__top-container">
            <div class="film-details__close">
              <button class="film-details__close-btn" type="button">close</button>
            </div>
            ${detailsTemplate}

            ${btnControlsTemplate}
          <div class="form-details__bottom-container">
            ${commentsTemplate}
          </div>
        </form>
      </section>`
    ;
  }

  getTemplate() {
    return this.createFilmPopupTemplate(this._film);
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    this._callback.closePopup();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  _addToWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchedlistClick();
  }

  _addToFavoritesClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavoritesClick();
  }

  setClosePopupHandler(callback) {
    this._callback.closePopup = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._addToWatchlistClickHandler);
  }

  setAddToWatchedClickHandler(callback) {
    this._callback.addToWatchedlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._addToWatchedClickHandler);
  }

  setAddToFavoritesClickHandler(callback) {
    this._callback.addToFavoritesClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._addToFavoritesClickHandler);
  }

  removeClosePopupHandler() {
    this.getElement().querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._callback.closePopup);
  }
}
