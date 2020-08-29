import moment from "moment";

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandom = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
};

const getRandomItemFromList = (list) => {
  const random = getRandomInteger(0, list.length - 1);
  return list[random];
};

const generateRandomList = (minlength, maxLength, fullList) => {
  const random = getRandomInteger(minlength, maxLength);
  const cloneFullList = Array.from(fullList);
  const list = [];

  for (let i = 0; i < random; i++) {
    const itemIndex = getRandomInteger(0, cloneFullList.length - 1);
    list.push(cloneFullList[itemIndex]);
    cloneFullList.splice(itemIndex, 1); // удаляем из клона исходного массива чтобы элементы не повторялись
  }
  return list;
};

const formattedDate = (date, format) => moment(date).format(format);

const huminazeFormattedDate = (date, format) => moment(date, format).fromNow();

const formattedDuration = (duration, format) => moment.utc().startOf(`day`).add(duration, `minutes`).format(format);

export {getRandomInteger, getRandom, getRandomItemFromList, formattedDate, generateRandomList, formattedDuration, huminazeFormattedDate};
