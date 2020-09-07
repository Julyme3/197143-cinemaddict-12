const EMOJI = [`smile`, `sleeping`, `puke`, `angry`];

const RankFromWatchCount = {
  NOVICE: 10,
  FAN: 20,
  MOVIE_BUFF: 21,
};

const SortTypes = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

const UserRank = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`,
};

const AUTHORIZATION = `Basic fsdfds432dfsf1`;

const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

export {EMOJI, RankFromWatchCount, SortTypes, UserAction, UpdateType, FilterType, AUTHORIZATION, END_POINT, UserRank};
