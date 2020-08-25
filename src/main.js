import {render} from "./utils/render";
import {generateFilmCard} from "./mock/film";
import {generateUserProfile} from "./mock/user-profile";
import {generateFilter} from "./mock/filter";
import UserProfileView from "./view/user-profile";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import FilmListPresenter from "./presenter/film-list.js";

const FILM_CARD_COUNT = 20;
const films = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const userProfile = generateUserProfile(films.filter((filter) => filter.isWatched).length);
const filters = generateFilter(films);

const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);

render(headerElement, new UserProfileView(userProfile), `beforeend`);

const menuComponent = new MenuView();
render(mainElement, menuComponent, `afterbegin`);
render(menuComponent, new FilterView(filters), `afterbegin`);

const filmListPresenter = new FilmListPresenter(mainElement);
filmListPresenter.init(films);
