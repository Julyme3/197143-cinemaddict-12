import he from "he";
import SmartView from "./smart";
import {huminazeFormattedDate} from "../utils/common";
import {UserAction} from "../const";

export default class Comments extends SmartView {
  constructor(comments = []) {
    super();
    this._data = {
      comments,
      isDeleting: null
    };

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  createCommentItemTemplate(comment, isDeleting) {
    const {emoji, message, authorName, date, id} = comment;

    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emoji}.png"
          width="55"
          height="55"
          alt="emoji-${emoji}"
          />
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(message)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${authorName}</span>
            <span class="film-details__comment-day">${huminazeFormattedDate(date, `YYYYMMDD`)}</span>
            <button class="film-details__comment-delete" data-id="${id}" ${isDeleting ? `disabled` : ``}>${isDeleting ? `Deleting` : `Delete`}</button>
          </p>
        </div>
      </li>`
    ;
  }

  createCommentsTemplate(data) {
    const comments = data.comments;
    const commentTemplate = comments.map((comment) => {
      const isDeleting = data.isDeleting && data.isDeleting[comment.id];
      return this.createCommentItemTemplate(comment, isDeleting);
    }).join(``);

    return `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentTemplate}
        </ul>
      </section>`
    ;
  }

  getTemplate() {
    return this.createCommentsTemplate(this._data);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.className !== `film-details__comment-delete`) {
      return;
    }
    this._callback.commentDelete(UserAction.DELETE_COMMENT, evt.target.dataset.id);
  }

  setDeleteClickHandler(callback) {
    this._callback.commentDelete = callback;
    this.getElement().addEventListener(`click`, this._deleteClickHandler);
  }

  restoreHandlers() {
    this.setDeleteClickHandler(this._callback.commentDelete);
  }
}
