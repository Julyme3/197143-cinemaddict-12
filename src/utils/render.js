import Abstract from "../view/abstract.js";

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

const renderTemplate = (container, template, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const removeChild = (child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  const parent = child.parentElement;

  if (parent === null || child === null) {
    throw new Error(`Can't remove unexisting elements`);
  }

  parent.removeChild(child);
};

const appendChild = (container, child) => {
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (container === null || child === null) {
    throw new Error(`Can't append unexisting elements`);
  }

  container.appendChild(child);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export {render, createElement, appendChild, removeChild, remove, renderTemplate, replace};
