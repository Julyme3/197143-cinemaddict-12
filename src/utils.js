const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const renderTemplate = (container, template, place) => container.insertAdjacentHTML(place, template);

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

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

const formattedDateTime = (date) => {
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;

  return `${year}/${month}/${day} ${hour}:${minute}`;
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

export {render, renderTemplate, createElement, getRandomInteger, getRandom, getRandomItemFromList, formattedDateTime, generateRandomList};
