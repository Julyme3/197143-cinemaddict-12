const generateFilter = (films) => [
  {
    title: `All movies`,
    count: films.length
  },
  {
    title: `Watchlist`,
    count: films.filter((film) => film.isToWatchList).length
  },
  {
    title: `History`,
    count: films.filter((film) => film.isWatched).length
  },
  {
    title: `Favorites`,
    count: films.filter((film) => film.isFavorite).length
  },
];

export {generateFilter};
