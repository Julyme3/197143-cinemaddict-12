const createItemFilterTemplate = (filter, isActive) => {
  const MAX_COUNT = 5;

  return `<a href="#watchlist" class="main-navigation__item main-navigation__item-${isActive}">${filter.title}
    ${(filter.title === `All movies` || filter.count > MAX_COUNT) ? `` : `<span class="main-navigation__item-count">${filter.count}</span>`}
    </a>`
  ;
};

const createFilterTemplate = (filters) =>
  `<div class="main-navigation__items">
    ${filters.map((filter, index) => createItemFilterTemplate(filter, index === 0)).join(``)}
  </div>`
;

export {createFilterTemplate};
