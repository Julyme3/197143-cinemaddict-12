import {generateFilter} from "../mock/filter";
import {createFilterTemplate} from "./filter";

const createMenuTemplate = (filmCards) => {
  const filters = generateFilter(filmCards);
  const filterTemplate = createFilterTemplate(filters);
  return `<nav class="main-navigation">
      ${filterTemplate}
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  ;
};

export {createMenuTemplate};
