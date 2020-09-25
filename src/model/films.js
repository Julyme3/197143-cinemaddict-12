import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films;

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, updatedItem) {
    const idx = this._films.findIndex((item) => item.id === updatedItem.id);

    if (idx === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._films = [
      ...this._films.slice(0, idx),
      updatedItem,
      ...this._films.slice(idx + 1)
    ];

    this._notify(updateType, updatedItem);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          raiting: film.film_info.total_rating,
          poster: film.film_info.poster,
          ageRaiting: film.film_info.age_rating,
          director: film.film_info.director,
          writers: film.film_info.writers,
          actors: film.film_info.actors,
          release: new Date(film.film_info.release.date),
          country: film.film_info.release.release_country,
          duration: film.film_info.runtime,
          genres: film.film_info.genre,
          description: film.film_info.description,
          isFavorite: film.user_details.favorite,
          isToWatchList: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          watchingDate: new Date(film.user_details.watching_date)
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptedToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "film_info": {
            "title": film.title,
            "alternative_title": film.originalTitle,
            "total_rating": film.raiting,
            "poster": film.poster,
            "age_rating": film.ageRaiting,
            "director": film.director,
            "writers": film.writers,
            "actors": film.actors,
            "release": {
              "date": film.release,
              "release_country": film.country
            },
            "runtime": film.duration,
            "genre": film.genres,
            "description": film.description
          },
          "user_details": {
            "watchlist": film.isToWatchList,
            "already_watched": film.isWatched,
            "watching_date": film.watchingDate.toJSON(),
            "favorite": film.isFavorite
          }
        }
    );

    delete adaptedFilm.actors;
    delete adaptedFilm.ageRaiting;
    delete adaptedFilm.country;
    delete adaptedFilm.description;
    delete adaptedFilm.director;
    delete adaptedFilm.duration;
    delete adaptedFilm.isFavorite;
    delete adaptedFilm.isWatched;
    delete adaptedFilm.isToWatchList;
    delete adaptedFilm.originalTitle;
    delete adaptedFilm.poster;
    delete adaptedFilm.raiting;
    delete adaptedFilm.release;
    delete adaptedFilm.title;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.writers;

    return adaptedFilm;
  }
}
