import {render} from "./utils/render";
import MenuView from "./view/menu";
import UserProfilePresenter from "./presenter/user-profile";
import FilmListPresenter from "./presenter/film-list.js";
import FilterPresenter from "./presenter/filter";
import FilmsModel from "./model/films";
import FilterModel from "./model/filter";
import Api from "./api";
import {UpdateType, AUTHORIZATION, END_POINT} from "./const";

const api = new Api(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const menuComponent = new MenuView();
const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);
const filterPresenter = new FilterPresenter(menuComponent, filterModel, filmsModel);
const filmListPresenter = new FilmListPresenter(mainElement, filmsModel, filterModel, api);
const userProfilePresenter = new UserProfilePresenter(headerElement, filmsModel);

filterPresenter.init();
filmListPresenter.init();
userProfilePresenter.init();

api.getItems(`/movies`, FilmsModel)
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films); // кладем массив фильмов в модель
    render(mainElement, menuComponent, `afterbegin`);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    render(mainElement, menuComponent, `afterbegin`);
  });
