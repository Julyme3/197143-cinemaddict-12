import Observer from "../utils/observer";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films;
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, updatedItem) {
    const idx = this._films.findIndex((item) => item.id === updatedItem.id);

    if (idx === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._films = [
      ...this._films.slice(0, idx),
      updatedItem,
      ...this._films.slice(idx + 1)
    ];

    this._notify(updateType, updatedItem);
  }
}
