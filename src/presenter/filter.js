import {filter} from "../utils/filter";
import FilterView from "../view/filter";
import {FilterType, UpdateType} from "../const";
import {render, replace, remove} from "../utils/render";

export default class Filter {
  constructor(container, filterModel, filmsModel, changeViewFromStatistics) {
    this._container = container;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filterComponent = null;
    this._changeViewFromStatistics = changeViewFromStatistics;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilterType = this._filterModel.getFilter();
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
    const statisticsElement = document.querySelector(`.statistic`);

    if (statisticsElement && this._changeViewFromStatistics) {
      this._changeViewFromStatistics();
      this._filterModel.setFilter(UpdateType.MAJOR, filterType);
      return;
    }

    if (this._currentFilterType === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _handleModelEvent() {
    this.init();
  }

}
