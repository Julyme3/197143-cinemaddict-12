import {render} from "./utils";
import {generateFilmCard} from "./mock/film";
import {generateUserProfile} from "./mock/user-profile";
import {generateFilter} from "./mock/filter";
import UserProfileView from "./view/user-profile";
import MenuView from "./view/menu";
import FilterView from "./view/filter";
import SortView from "./view/sort";
import FilmContainerView from "./view/film-container";
import FilmListView from "./view/film-list";
import FilmCardView from "./view/card";
import ExtraFilmContainerView from "./view/extra-film";
import LoadMoreBtnView from "./view/load-more-btn";
import FilmPopupView from "./view/film-popup";

const FILM_CARD_COUNT = 20;
const EXTRA_FILM_CARD_COUNT = 2;
const FILM_COUNT_GAP = 5;
const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const userProfile = generateUserProfile(filmCards.filter((filter) => filter.isWatched).length);
const filters = generateFilter(filmCards);

const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);

render(headerElement, new UserProfileView(userProfile).getElement(), `beforeend`);

const menuComponent = new MenuView();
render(mainElement, menuComponent.getElement(), `afterbegin`);

render(menuComponent.getElement(), new FilterView(filters).getElement(), `afterbegin`);

render(mainElement, new SortView().getElement(), `beforeend`);

const filmContainerComponent = new FilmContainerView();
const filmListComponent = new FilmListView();
render(mainElement, filmContainerComponent.getElement(), `beforeend`);

const filmListElement = filmContainerComponent.getElement().querySelector(`.films-list`);
render(filmListElement, filmListComponent.getElement(), `beforeend`);

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopupComponent = new FilmPopupView(film);

  render(container, filmCardComponent.getElement(), `beforeend`);

  const closePopupElement = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);
  const openPopupElements = filmCardComponent.getElement().querySelectorAll(`.film-card__poster, .film-card__title, .film-card__comments`);

  const openPopupHandler = () => {
    body.appendChild(filmPopupComponent.getElement());
  };

  const closePopupHandler = () => {
    body.removeChild(filmPopupComponent.getElement());
    closePopupElement.removeEventListener(`click`, closePopupHandler);
  };

  openPopupElements.forEach((item) => item.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    openPopupHandler();

    closePopupElement.addEventListener(`click`, () => {
      evt.preventDefault();
      closePopupHandler();
    });
  }));

};

for (let i = 0; i < Math.min(FILM_COUNT_GAP, filmCards.length); i++) {
  renderFilm(filmListComponent.getElement(), filmCards[i]);
}

const topFilmContainerComponent = new ExtraFilmContainerView();
const commentedFilmContainerComponent = new ExtraFilmContainerView();

const renderExtraFilm = (filmsContainer, extraContainer, films) => {
  render(filmsContainer.getElement(), extraContainer.getElement(), `beforeend`);
  const extraFilmList = extraContainer.getElement().querySelector(`.films-list__container`);

  for (let i = 0; i < EXTRA_FILM_CARD_COUNT; i++) {
    renderFilm(extraFilmList, films[i]);
  }
};

renderExtraFilm(filmContainerComponent, topFilmContainerComponent, filmCards.slice(0, 2));
renderExtraFilm(filmContainerComponent, commentedFilmContainerComponent, filmCards.slice(0, 2));

if (filmCards.length > FILM_COUNT_GAP) {
  const loadMoreBtnComponent = new LoadMoreBtnView();
  render(filmListElement, loadMoreBtnComponent.getElement(), `beforeend`);

  const loadMoreBtnElement = loadMoreBtnComponent.getElement();
  let renderedCardsCount = FILM_COUNT_GAP;

  const btnShowMoreHandler = () => {
    filmCards
      .slice(renderedCardsCount, renderedCardsCount + FILM_COUNT_GAP)
      .forEach((filmCard) => renderFilm(filmListComponent.getElement(), filmCard));
    renderedCardsCount += FILM_COUNT_GAP;

    if (renderedCardsCount >= filmCards.length) {
      loadMoreBtnElement.removeEventListener(`click`, btnShowMoreHandler);
      loadMoreBtnElement.remove();
    }
  };

  loadMoreBtnElement.addEventListener(`click`, btnShowMoreHandler);
}
