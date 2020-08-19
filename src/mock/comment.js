import {EMOJI} from "../const";
import {getRandomItemFromList} from "../utils/common";

const messages = [`Interesting setting and a good cast`, `Booooooooooring`, `Very very old. Meh`, `Almost two hours? Seriously?`];

const generateComment = () => ({
  message: getRandomItemFromList(messages),
  emoji: getRandomItemFromList(EMOJI),
  authorName: `Author`,
  date: new Date(),
});

export {generateComment};
