// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
const getRandomDate = () => {
  const start = new Date(1970, 0, 1);
  const end = new Date();

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const sortByDateDown = (filmA, filmB) => filmB.release.getTime() - filmA.release.getTime();

const sortByRatingDown = (filmA, filmB) => filmB.raiting - filmA.raiting;

export {getRandomDate, sortByDateDown, sortByRatingDown};
