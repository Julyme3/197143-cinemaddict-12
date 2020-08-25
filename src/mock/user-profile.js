import {RankFromWatchCount} from "../const";

const generateUserProfile = (watchedCount) => {
  const {NOVICE, FAN, MOVIE_BUFF} = RankFromWatchCount;
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
