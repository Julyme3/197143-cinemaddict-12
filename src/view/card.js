const createFilmCardTemplate = (film) => {
  const MAX_DESCRIPTION_LENGTH = 140;
  const {title, raiting, yearProduction, duration, poster, genres, isFavorite, isToWatchList, isWatched, comments} = film;
  let {description} = film;
  const favoriteActiveClass = isFavorite ? `film-card__controls-item--active` : ``;
  const watchListActiveClass = isToWatchList ? `film-card__controls-item--active` : ``;
  const watchedActiveClass = isWatched ? `film-card__controls-item--active` : ``;

  description = description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 1)}&#8230;` : description;

  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${raiting}</p>
      <p class="film-card__info">
        <span class="film-card__year">${yearProduction}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img
        src="./images/posters/${poster}"
        alt=""
        class="film-card__poster"
      />
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${comments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchListActiveClass}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedActiveClass}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteActiveClass}">Mark as favorite</button>
      </form>
    </article>`
  ;
};

export {createFilmCardTemplate};
