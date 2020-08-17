import AbstractView from "./abstract";
import {EMOJI} from "../const";
import {formattedDateTime} from "../utils/common";

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
            <span class="film-details__comment-day">${formattedDateTime(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    ;
  }

  createEmojiListTemplate() {
    return EMOJI.map((emoji) =>
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
          <label class="film-details__emoji-label" for="emoji-${emoji}">
          <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`
    ).join(``);
  }

  createCommentsTemplate(comments) {
    const commentTemplate = comments.map(this.createCommentItemTemplate).join(``);
    const emojiListTemplate = this.createEmojiListTemplate();

    return `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${emojiListTemplate}
          </div>
        </div>
      </section>`
    ;
  }

  getTemplate() {
    return this.createCommentsTemplate(this._comments);
  }

}
