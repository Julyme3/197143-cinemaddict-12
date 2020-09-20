import {render, remove, renderTemplate} from "./utils/render";
import MenuView from "./view/menu";
import StatisticsView from "./view/statistics";
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
let statisticsComponent = null;
const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const footerElement = body.querySelector(`.footer`);
const mainElement = body.querySelector(`.main`);
const filmListPresenter = new FilmListPresenter(mainElement, filmsModel, filterModel, api);
const filterPresenter = new FilterPresenter(menuComponent, filterModel, filmsModel, () => {
  if (statisticsComponent) {
    remove(statisticsComponent);
  }
});
const userProfilePresenter = new UserProfilePresenter(headerElement, filmsModel);

const handleMenuStatisticsClick = () => {
  statisticsComponent = new StatisticsView(filmsModel.getFilms());
  filmListPresenter.destroy();
  render(mainElement, statisticsComponent, `beforeend`);
};

filterPresenter.init();
filmListPresenter.init();
userProfilePresenter.init();

menuComponent.setMenuStatisticsClickHandler(handleMenuStatisticsClick);

api.getItems(`/movies`, FilmsModel)
  .then((films) => {
    filmsModel.setFilms(UpdateType.INIT, films);
    render(mainElement, menuComponent, `afterbegin`);
    renderTemplate(footerElement.querySelector(`.footer__statistics`), `<p>${films.length}  movies inside</p>`, `beforeend`);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
    render(mainElement, menuComponent, `afterbegin`);
  });
