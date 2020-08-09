import {render} from "./utils";
import {generateFilmCard} from "./mock/film";
import {generateUserProfile} from "./mock/user-profile";
import {createUserRankTemplate} from "./view/user-profile";
import {createMenuTemplate} from "./view/menu";
import {createSortTemplate} from "./view/sort";
import {createFilmsContainerTemplate} from "./view/film-container";
import {createFilmCardTemplate} from "./view/card";
import {createLoadMoreBtnTemplate} from "./view/load-more-btn";
import {createFilmPopupTemplate} from "./view/film-popup";

const FILM_CARD_COUNT = 20;
const EXTRA_FILM_CARD_COUNT = 2;
const FILM_COUNT_GAP = 5;
const filmCards = new Array(FILM_CARD_COUNT).fill().map(generateFilmCard);
const userProfile = generateUserProfile(filmCards.filter((filter) => filter.isWatched).length);

const body = document.querySelector(`body`);
const headerElement = body.querySelector(`.header`);
const mainElement = body.querySelector(`.main`);

render(headerElement, createUserRankTemplate(userProfile), `beforeend`);
render(mainElement, createMenuTemplate(filmCards), `afterbegin`);

render(mainElement, createSortTemplate(), `beforeend`);
render(mainElement, createFilmsContainerTemplate(), `beforeend`);

const filmCardsContainer = mainElement.querySelector(`.films`);
const filmCardsList = filmCardsContainer.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(FILM_COUNT_GAP, filmCards.length); i++) {
  render(filmCardsList, createFilmCardTemplate(filmCards[i]), `beforeend`);
}

const extraFilmElements = filmCardsContainer.querySelectorAll(`.films-list--extra`);

for (let i = 0; i < extraFilmElements.length; i++) {
  const extraContainer = extraFilmElements[i].querySelector(`.films-list__container`);

  for (let j = 0; j < EXTRA_FILM_CARD_COUNT; j++) {
    render(extraContainer, createFilmCardTemplate(filmCards[i]), `beforeend`);
  }
}
createFilmPopupTemplate(filmCards[0]); // для попапа

if (filmCards.length > FILM_COUNT_GAP) {
  render(filmCardsList, createLoadMoreBtnTemplate(), `afterend`);

  const loadMoreBtn = filmCardsContainer.querySelector(`.films-list__show-more`);
  let renderedCardsCount = FILM_COUNT_GAP;

  const btnShowMoreHandler = () => {
    filmCards
      .slice(renderedCardsCount, renderedCardsCount + FILM_COUNT_GAP)
      .forEach((filmCard) => render(filmCardsList, createFilmCardTemplate(filmCard), `beforeend`));
    renderedCardsCount += FILM_COUNT_GAP;

    if (renderedCardsCount >= filmCards.length) {
      loadMoreBtn.removeEventListener(`click`, btnShowMoreHandler);
      loadMoreBtn.remove();
    }
  };

  loadMoreBtn.addEventListener(`click`, btnShowMoreHandler);
}
