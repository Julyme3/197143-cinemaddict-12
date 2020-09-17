import SmartView from "./smart";
import {EMOJI, UserAction} from "../const";
import {isCtrlEnter} from "../utils/common";

export default class NewComment extends SmartView {
  constructor() {
    super();
    this._data = {
      emoji: null,
      message: ``,
      isDisabled: false
    };

    this._textarea = this.getElement().querySelector(`.film-details__comment-input`);

    this._inputFormMessageHandler = this._inputFormMessageHandler.bind(this);
    this._enableEmojiToggleHandler = this._enableEmojiToggleHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);

    this._setInnerHandlers();
  }

  createImgTemplate() {
    return `<img src="images/emoji/${this._data.emoji}.png" width="55" height="55" alt="emoji-${this._data.emoji}">`;
  }

  createEmojiListTemplate() {
    return EMOJI.map((emojiItem) => `<input class="film-details__emoji-item visually-hidden"
        name="comment-emoji" type="radio"
        id="emoji-${emojiItem}"
        value="${emojiItem}" ${emojiItem === this._data.emoji ? `checked` : ``}
        ${this._data.isDisabled ? `disabled` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emojiItem}">
        <img src="./images/emoji/${emojiItem}.png" width="30" height="30" alt="emoji">
      </label>`
    ).join(``);
  }

  createTemplate() {
    const emojiListTemplate = this.createEmojiListTemplate();
    return `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${this._data.emoji ? this.createImgTemplate() : ``}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${this._data.isDisabled ? `disabled` : ``}></textarea>
        </label>

        <div class="film-details__emoji-list">
          ${emojiListTemplate}
        </div>
      </div>`
    ;
  }

  getTemplate() {
    return this.createTemplate();
  }

  _enableEmojiToggler() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._enableEmojiToggleHandler);
  }

  _handleInputFormMessage() {
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`change`, this._inputFormMessageHandler);
  }

  _inputFormMessageHandler(evt) {
    evt.preventDefault();
    this.updateData({
      message: evt.target.value
    }, true);
  }

  _enableEmojiToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emoji: evt.target.value
    });

    this.getElement().querySelector(`.film-details__comment-input`).value = this._data.message;
  }

  _addCommentHandler(evt) {
    if (this._data.message === `` || !this._data.emoji) {
      return;
    }

    if (isCtrlEnter(evt)) {
      const newComment = Object.assign(
          {},
          this._data,
          {
            date: new Date(),
          });
      this._callback.commentAdd(UserAction.ADD_COMMENT, newComment);
      this.reset();
    }
  }

  setAddCommentHandler(callback) {
    this._callback.commentAdd = callback;
    document.addEventListener(`keydown`, this._addCommentHandler);
  }

  _setInnerHandlers() { // внутренние обработчики
    this._enableEmojiToggler();
    this._handleInputFormMessage();
  }

  reset() {
    this._data.emoji = null;
    this._data.message = ``;
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setAddCommentHandler(this._callback.commentAdd);
  }

  _destroyHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).removeEventListener(`change`, this._enableEmojiToggleHandler);
    this.getElement().querySelector(`.film-details__comment-input`).removeEventListener(`change`, this._inputFormMessageHandler);
  }

}
