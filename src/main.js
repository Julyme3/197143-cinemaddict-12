import {render} from "./utils/render";
import {generateFilmCard} from "./mock/film";
import {generateUserProfile} from "./mock/user-profile";
import UserProfileView from "./view/user-profile";
import MenuView from "./view/menu";
import FilmListPresenter from "./presenter/film-list.js";
import FilterPresenter from "./presenter/filter";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";

const FILM_CARD_COUNT = 8;
const films = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
filmsModel.setFilms(films); // кладем массив фильмов в модель
const userProfile = generateUserProfile(films.filter((filter) => filter.isWatched).length);

const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);

render(headerElement, new UserProfileView(userProfile), `beforeend`);

const menuComponent = new MenuView();
render(mainElement, menuComponent, `afterbegin`);

const filterPresenter = new FilterPresenter(menuComponent, filterModel, filmsModel);
const filmListPresenter = new FilmListPresenter(mainElement, filmsModel, filterModel);
filterPresenter.init();
filmListPresenter.init();
