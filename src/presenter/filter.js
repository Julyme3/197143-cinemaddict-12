import {filter} from "../utils/filter";
import FilterView from "../view/filter";
import {FilterType, UpdateType} from "../const";
import {render, replace, remove} from "../utils/render";

export default class Filter {
  constructor(container, filterModel, filmsModel) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filterComponent = null;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filterModel.addObserver(this._handleModelEvent); // подписываемся на изменение модели фильтров
    this._filmsModel.addObserver(this._handleModelEvent); // подписываемся на изменение модели задач
  }

  init() {
    this._currentFilterType = this._filterModel.getFilter(); // забираем текущий фильтр
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(filters, this._currentFilterType);
    this._filterComponent.setFilterTypeChangeHandler(this._handleViewAction);

    if (prevFilterComponent === null) {
      render(this._container, this._filterComponent, `afterbegin`);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.ALL,
        title: `All movies`,
        count: filter[FilterType.ALL](films).length
      },
      {
        type: FilterType.WATCHLIST,
        title: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        title: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        title: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
  }

  _handleViewAction(filterType) {
    if (this._currentFilterType === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType); // перерисовываем всю доску
  }

  _handleModelEvent() {
    this.init();
  }

}
