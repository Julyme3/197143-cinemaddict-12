import AbstractView from "./abstract";
import {huminazeFormattedDate} from "../utils/common";

export default class Comments extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  createCommentItemTemplate(comment) {
    const {emoji, message, authorName, date} = comment;

    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emoji}.png"
          width="55"
          height="55"
          alt="emoji-${emoji}"
          />
        </span>
        <div>
          <p class="film-details__comment-text">${message}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${authorName}</span>
            <span class="film-details__comment-day">${huminazeFormattedDate(date, `YYYYMMDD`)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    ;
  }

  createCommentsTemplate(comments) {
    const commentTemplate = comments.map(this.createCommentItemTemplate).join(``);

    return `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentTemplate}
        </ul>
      </section>`
    ;
  }

  getTemplate() {
    return this.createCommentsTemplate(this._comments);
  }

}
