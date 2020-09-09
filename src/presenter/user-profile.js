import {render, replace, remove} from "../utils/render";
import UserProfileView from "../view/user-profile";
import {RankFromWatchCount, UserRank} from "../const";

export default class UserProfile {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._userProfileComponent = null;
    this._watchedCount = 0;
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._films = this._filmsModel.getFilms();
    const prevUserProfileComponent = this._userProfileComponent;
    this._userProfileComponent = new UserProfileView(this._getUserRank());

    if (prevUserProfileComponent === null) {
      render(this._container, this._userProfileComponent, `beforeend`);
      return;
    }

    replace(this._userProfileComponent, prevUserProfileComponent);
    remove(prevUserProfileComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _getUserRank() {
    this._watchedCount = this._films.filter((film) => film.isWatched).length;
    const {NOVICE, FAN, MOVIE_BUFF} = RankFromWatchCount;
    let userRank = ``;
    switch (true) {
      case this._watchedCount === 0:
        userRank = ``;
        break;
      case this._watchedCount <= NOVICE:
        userRank = UserRank.NOVICE;
        break;
      case this._watchedCount > NOVICE && this._watchedCount <= FAN:
        userRank = UserRank.FAN;
        break;
      case this._watchedCount >= MOVIE_BUFF:
        userRank = UserRank.MOVIE_BUFF;
        break;
    }
    return userRank;
  }
}
