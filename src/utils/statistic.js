import moment from "moment";

const StatisticsDaysRange = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

const makeItemsUniq = (items) => [...new Set(items)];

const getFilmsByGenre = (films, genre) => {
  return films.filter((film) => film.genres.includes(genre)).length; // длина массив фильмов с конкретным жанром
};

const getTotalDuration = (films) => {
  return films.reduce((counter, film) => {
    return film.duration + counter;
  }, 0);
};

const getListWatchedFilmsInDateRange = (films, dateFrom, dateTo) => { // фильмы по временному интервалу
  return films.filter((film) => {
    if (
      moment(film.watchingDate).isSame(dateFrom) ||
      moment(film.watchingDate).isBetween(dateFrom, dateTo) ||
      moment(film.watchingDate).isSame(dateTo)
    ) {
      return film;
    }
    return false;
  });
};

const getTopGenre = (films) => {
  const genres = films.map((film) => film.genres);
  const uniqGenres = makeItemsUniq([].concat(...genres));
  const countFilmsByGenre = uniqGenres.map((genre) => getFilmsByGenre(films, genre));
  const maxIndex = countFilmsByGenre.indexOf(Math.max(...countFilmsByGenre));
  return uniqGenres[maxIndex];
};

export {StatisticsDaysRange, makeItemsUniq, getFilmsByGenre, getListWatchedFilmsInDateRange, getTotalDuration, getTopGenre};
