import SmartView from "./smart";
import {EMOJI, UserAction} from "../const";
import {isCtrlEnter} from "../utils/common";

export default class NewComment extends SmartView {
  constructor() {
    super();
    this._data = {
      emoji: null,
      message: ``,
    };

    this._selectorTextarea = `.film-details__comment-input`;
    this._selectorEmojiInput = `.film-details__emoji-item`;
    this._isEmojiChecked = false;

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
        value="${emojiItem}" ${emojiItem === this._data.emoji ? `checked` : ``}>
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
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"}></textarea>
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
    this.getElement().querySelector(this._selectorTextarea).addEventListener(`input`, this._inputFormMessageHandler);
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

    this.getElement().querySelector(this._selectorTextarea).value = this._data.message;
    this._isEmojiChecked = true;
  }

  _addCommentHandler(evt) {

    if (!isCtrlEnter(evt)) {
      return;
    }

    if (this._data.message.trim() === `` || !this._data.emoji) {
      return;
    }

    const newComment = Object.assign(
        {},
        this._data,
        {
          date: new Date(),
        });
    this._callback.commentAdd(UserAction.ADD_COMMENT, newComment);

    this._data = {
      emoji: null,
      message: ``,
    };
  }

  setAddCommentHandler(callback) {
    this._callback.commentAdd = callback;
    this.getElement().querySelector(this._selectorTextarea).addEventListener(`keydown`, this._addCommentHandler);
  }

  _setInnerHandlers() {
    this._enableEmojiToggler();
    this._handleInputFormMessage();
  }

  reset() {
    if (this._data.emoji || this._data.message || this._isEmojiChecked) {
      this.getElement().querySelector(this._selectorTextarea).value = ``;
      this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
      this._data.emoji = null;
      this._data.message = ``;
      Array.from(this.getElement().querySelectorAll(`.film-details__emoji-item`))
      .find((input) => input.checked)
      .checked = false;

      this._isEmojiChecked = false;
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setAddCommentHandler(this._callback.commentAdd);
  }

  disableForm() {
    this.getElement().querySelectorAll(this._selectorEmojiInput).forEach((emojiInput) => {
      emojiInput.disabled = true;
    });
    this.getElement().querySelector(this._selectorTextarea).disabled = true;
  }

  enableForm() {
    this.getElement().querySelectorAll(this._selectorEmojiInput).forEach((emojiInput) => {
      emojiInput.disabled = false;
    });
    this.getElement().querySelector(this._selectorTextarea).disabled = false;
  }
}
