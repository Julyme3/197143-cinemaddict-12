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
  MAJOR: `MAJOR`
};

const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`
};

export {EMOJI, RankFromWatchCount, SortTypes, UserAction, UpdateType, FilterType};
