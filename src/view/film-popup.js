import {generateComment} from "../mock/comment";
import {createCommentsTemplate} from "./comments";

const createGenresTemplate = (genres) =>
  `<tr class="film-details__row">
    <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
    <td class="film-details__cell">
      ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
    </tr>
  `
;

const createFilmDetailsTemplate = (film) => {
  const {title, originalTitle, raiting, country, director, writers, actors, release, duration, poster, genres, description, ageRaiting} = film;
  const genresTemplate = createGenresTemplate(genres);

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
              <td class="film-details__cell">${release}</td>
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
};

const createBtnControlsTemplate = (isFavorite, isToWatchList, isWatched) =>
  `<section class="film-details__controls">
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

const createFilmPopupTemplate = (film) => {
  const {isFavorite, isToWatchList, isWatched, comments} = film;
  const filmDetailsTemplate = createFilmDetailsTemplate(film);
  const btnControlsTemplate = createBtnControlsTemplate(isFavorite, isToWatchList, isWatched);
  const commentsTemplate = createCommentsTemplate(new Array(comments).fill().map(generateComment));

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          ${filmDetailsTemplate}

          ${btnControlsTemplate}
        <div class="form-details__bottom-container">
          ${commentsTemplate}
        </div>
      </form>
    </section>`
  ;
};

export {createFilmPopupTemplate};
