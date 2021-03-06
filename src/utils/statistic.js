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
  return films.filter((film) => film.genres.includes(genre)).length;
};

const getTotalDuration = (films) => {
  return films.reduce((counter, film) => {
    return film.duration + counter;
  }, 0);
};

const getListWatchedFilmsInDateRange = (films, dateFrom, dateTo, day) => {
  return films.filter(({watchingDate}) => (moment(watchingDate).isSame(dateFrom, day) || moment(watchingDate).isBetween(dateFrom, dateTo)));
};

const getTopGenre = (films) => {
  const genres = films.map((film) => film.genres);
  const uniqGenres = makeItemsUniq([].concat(...genres));
  const countFilmsByGenre = uniqGenres.map((genre) => getFilmsByGenre(films, genre));
  const maxIndex = countFilmsByGenre.indexOf(Math.max(...countFilmsByGenre));
  return uniqGenres[maxIndex];
};

export {StatisticsDaysRange, makeItemsUniq, getFilmsByGenre, getListWatchedFilmsInDateRange, getTotalDuration, getTopGenre};
