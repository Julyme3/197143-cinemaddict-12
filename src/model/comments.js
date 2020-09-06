import Observer from "../utils/observer";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments;
  }

  getComments() {
    return this._comments;
  }

  addComment(updatedItem) {
    this._comments = [
      ...this._comments,
      updatedItem
    ];

    this._notify(updatedItem);
  }

  deleteComment(updatedItemID) {
    const idx = this._comments.findIndex((item) => item.id === +updatedItemID);

    if (idx === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._comments = [
      ...this._comments.slice(0, idx),
      ...this._comments.slice(idx + 1)
    ];

    this._notify();
  }
}
