import {render} from "./utils";
import {createUserRankTemplate} from "./view/user-profile";
import {createMenuTemplate} from "./view/menu";
import {createSortTemplate} from "./view/sort";
import {createFilmsContainerTemplate} from "./view/film-container";
import {createFilmCardTemplate} from "./view/card";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";
import {createFilmPopupTemplate} from "./view/film-popup";
import {createCommentsTemplate} from "./view/comments";

const FILM_CARD_COUNT = 5;
const EXTRA_FILM_CARD_COUNT = 2;

const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);

render(headerElement, createUserRankTemplate(), `beforeend`);
render(mainElement, createMenuTemplate(), `afterbegin`);
render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmsContainerTemplate(), `beforeend`);

const filmCardsContainer = mainElement.querySelector(`.films`);
const filmCardsList = filmCardsContainer.querySelector(`.films-list__container`);

for (let i = 0; i < FILM_CARD_COUNT; i++) {
  render(filmCardsList, createFilmCardTemplate(), `beforeend`);
}

render(filmCardsList, createLoadMoreBtnTemplate(), `afterend`);

const extraFilmElements = filmCardsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < extraFilmElements.length; i++) {
  const extraContainer = extraFilmElements[i].querySelector(`.films-list__container`);

  for (let j = 0; j < EXTRA_FILM_CARD_COUNT; j++) {
    render(extraContainer, createFilmCardTemplate(), `beforeend`);
  }
}

createFilmPopupTemplate();
createCommentsTemplate();
