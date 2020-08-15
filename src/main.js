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
import NoFilmView from "./view/no-film";

const FILM_CARD_COUNT = 20;
const EXTRA_FILM_CARD_COUNT = 2;
const FILM_COUNT_GAP = 5;
const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const userProfile = generateUserProfile(filmCards.filter((filter) => filter.isWatched).length);
const filters = generateFilter(filmCards);

const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);

const renderFilm = (container, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmPopupComponent = new FilmPopupView(film);

  render(container, filmCardComponent.getElement(), `beforeend`);

  const closePopupElement = filmPopupComponent.getElement().querySelector(`.film-details__close-btn`);

  const closePopup = () => {
    body.removeChild(filmPopupComponent.getElement());
  };

  const openPopup = () => {
    body.appendChild(filmPopupComponent.getElement());
  };

  const escKeyDownHandler = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      closePopup();
      document.removeEventListener(`keydown`, escKeyDownHandler);
    }
  };

  const closePopupHandler = (evt) => {
    evt.preventDefault();
    closePopup();
    closePopupElement.removeEventListener(`click`, closePopupHandler);
  };

  const openPopupHandler = (evt) => {

    if (evt.target.className !== `film-card__poster`
    && evt.target.className !== `film-card__title`
    && evt.target.className !== `film-card__comments`) {
      return;
    }

    evt.preventDefault();
    openPopup();

    document.addEventListener(`keydown`, escKeyDownHandler);
    closePopupElement.addEventListener(`click`, closePopupHandler);
  };

  filmCardComponent.getElement().addEventListener(`click`, openPopupHandler);

};

const topFilmContainerComponent = new ExtraFilmContainerView();
const commentedFilmContainerComponent = new ExtraFilmContainerView();

const renderExtraFilm = (filmsContainer, extraContainer, films) => {
  render(filmsContainer.getElement(), extraContainer.getElement(), `beforeend`);
  const extraFilmList = extraContainer.getElement().querySelector(`.films-list__container`);

  for (let i = 0; i < EXTRA_FILM_CARD_COUNT; i++) {
    renderFilm(extraFilmList, films[i]);
  }
};

const renderBoard = (container, films) => {
  const filmContainerComponent = new FilmContainerView();
  render(container, filmContainerComponent.getElement(), `beforeend`);
  const filmListElement = filmContainerComponent.getElement().querySelector(`.films-list`);

  if (!films.length) {
    filmListElement.innerHTML = new NoFilmView().getTemplate();
    return;
  }

  const filmListComponent = new FilmListView();
  render(filmListElement, filmListComponent.getElement(), `beforeend`);

  films
    .slice(0, Math.min(FILM_COUNT_GAP, films.length))
    .forEach((film) => renderFilm(filmListComponent.getElement(), film));

  renderExtraFilm(filmContainerComponent, topFilmContainerComponent, films.slice(0, 2));
  renderExtraFilm(filmContainerComponent, commentedFilmContainerComponent, films.slice(0, 2));

  if (films.length > FILM_COUNT_GAP) {
    const loadMoreBtnComponent = new LoadMoreBtnView();
    render(filmListElement, loadMoreBtnComponent.getElement(), `beforeend`);

    const loadMoreBtnElement = loadMoreBtnComponent.getElement();
    let renderedCardsCount = FILM_COUNT_GAP;

    const btnShowMoreHandler = () => {
      films
        .slice(renderedCardsCount, renderedCardsCount + FILM_COUNT_GAP)
        .forEach((film) => renderFilm(filmListComponent.getElement(), film));
      renderedCardsCount += FILM_COUNT_GAP;

      if (renderedCardsCount >= films.length) {
        loadMoreBtnElement.removeEventListener(`click`, btnShowMoreHandler);
        loadMoreBtnElement.remove();
      }
    };

    loadMoreBtnElement.addEventListener(`click`, btnShowMoreHandler);
  }
};

render(headerElement, new UserProfileView(userProfile).getElement(), `beforeend`);

const menuComponent = new MenuView();
render(mainElement, menuComponent.getElement(), `afterbegin`);

render(menuComponent.getElement(), new FilterView(filters).getElement(), `afterbegin`);

render(mainElement, new SortView().getElement(), `beforeend`);
renderBoard(mainElement, filmCards);
