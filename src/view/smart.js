import AbstractView from "./abstract";

export default class Smart extends AbstractView {
  constructor() {
    super();
    this._data = {};
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;

    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    prevElement = null;

    this.restoreHandlers();
  }

  updateData(updatedProperty, onlyDataUpdating) {

    if (!updatedProperty) {
      return;
    }

    this._data = Object.assign({},
        this._data,
        updatedProperty
    );

    if (onlyDataUpdating) {
      return;
    }

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
