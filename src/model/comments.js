import Observer from "../utils/observer";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments;

    this._notify(updateType);
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
    const idx = this._comments.findIndex((item) => item.id === updatedItemID);

    if (idx === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._comments = [
      ...this._comments.slice(0, idx),
      ...this._comments.slice(idx + 1)
    ];

    this._notify();
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          message: comment.comment,
          authorName: comment.author,
          emoji: comment.emotion
        }
    );

    delete adaptedComment.comment;
    delete adaptedComment.emotion;
    delete adaptedComment.author;

    return adaptedComment;
  }

  static adaptToClientPostComment(data) {
    const comment = data.comments[data.comments.length - 1];
    const adaptedComment = Object.assign(
        {},
        {
          message: comment.comment,
          authorName: comment.author,
          emoji: comment.emotion,
          id: comment.id,
          date: new Date(comment.date)
        }
    );

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          comment: comment.message,
          emotion: comment.emoji
        }
    );

    delete adaptedComment.message;
    delete adaptedComment.authorName;
    delete adaptedComment.emoji;

    return adaptedComment;
  }

}
