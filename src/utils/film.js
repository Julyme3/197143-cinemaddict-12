const sortByDateDown = (filmA, filmB) => filmB.release.getTime() - filmA.release.getTime();

const sortByRatingDown = (filmA, filmB) => filmB.raiting - filmA.raiting;

export {sortByDateDown, sortByRatingDown};
