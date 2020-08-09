import {getRandomInteger, getRandom, getRandomItemFromList, generateRandomList} from "../utils";

const MIN_LENGTH_DESCRIPTION = 1;
const MAX_LENGTH_DESCRIPTION = 5;
const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `Made for each othe`,
  `The great flamarion`,
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const yearsProduction = [
  `1929`,
  `1933`,
  `1955`,
  `1964`,
  `1936`,
  `1939`,
  `1967`,
];

const countries = [`USA`, `France`, `England`, `Italy`];

const yearsRelease = [`20 February 1924`, `01 April 1995`, `04 January 1967`, `13 August 1936`, `15 May 1932`];

const genres = [`Comedy`, `Musical`, `Western`, `Cartoon`, `Drama`];

const agesRaiting = [`0+`, `6+`, `18+`, `16+`];

const authorNames = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
];

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const generateRaiting = () => {
  const MIN_RAITING = 0;
  const MAX_RAITING = 10;

  return getRandom(MIN_RAITING, MAX_RAITING).toFixed(1);
};

const generateDuration = () => {
  const MAX_DURATION = 14400000; // miliseconds
  const MIN_DURATION = 600000; // miliseconds
  const random = getRandomInteger(MIN_DURATION, MAX_DURATION);
  const date = new Date(random);
  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  hours = hours ? `${hours}h` : ``;
  minutes = minutes ? `${minutes}m` : ``;
  return `${hours} ${minutes}`;
};

const generateFilmCard = () => {
  return {
    title: getRandomItemFromList(titles),
    originalTitle: getRandomItemFromList(titles),
    poster: getRandomItemFromList(posters),
    description: generateRandomList(MIN_LENGTH_DESCRIPTION, MAX_LENGTH_DESCRIPTION, descriptions).join(` `),
    raiting: generateRaiting(),
    yearProduction: getRandomItemFromList(yearsProduction),
    genres: generateRandomList(1, genres.length, genres),
    duration: generateDuration(),
    director: getRandomItemFromList(authorNames),
    writers: generateRandomList(1, 3, authorNames).join(`, `),
    actors: generateRandomList(1, 3, authorNames).join(`, `),
    release: getRandomItemFromList(yearsRelease),
    country: getRandomItemFromList(countries),
    ageRaiting: getRandomItemFromList(agesRaiting),
    comments: getRandomInteger(0, 4),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isToWatchList: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
  };
};

export {generateFilmCard};
