import {RANK_FROM_WATCH_COUNT} from "../const";

const generateUserProfile = (watchedCount) => {
  const {NOVICE, FAN, MOVIE_BUFF} = RANK_FROM_WATCH_COUNT;
  let userRank = ``;
  if (watchedCount && watchedCount >= NOVICE) {
    userRank = `novice`;
  } else if (watchedCount && watchedCount >= FAN) {
    userRank = `fan`;
  } else if (watchedCount && watchedCount <= MOVIE_BUFF) {
    userRank = `movie buff`;
  }

  return {
    imageSrc: `images/bitmap@2x.png`,
    userRank,
  };
};

export {generateUserProfile};
