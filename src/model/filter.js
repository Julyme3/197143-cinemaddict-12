import {FilterType} from "../const";
import Observer from "../utils/observer";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilterType = FilterType.ALL;
  }

  setFilter(updateType, activeFilter) {
    this._activeFilterType = activeFilter;
    this._notify(updateType, activeFilter);
  }

  getFilter() {
    return this._activeFilterType;
  }
}
