import SmartView from "./smart";
import {EMOJI} from "../const";

export default class NewComment extends SmartView {
  constructor() {
    super();
    this._data = {
      choosedEmoji: null,
      inputMessage: ``,
    };

    this._inputFormMessageHandler = this._inputFormMessageHandler.bind(this);
    this._enableEmojiToggleHandler = this._enableEmojiToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  createImgTemplate() {
    return `<img src="images/emoji/${this._data.choosedEmoji}.png" width="55" height="55" alt="emoji-${this._data.hoosedEmoji}">`;
  }

  createEmojiListTemplate() {
    return EMOJI.map((emoji) => `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${emoji === this._data.choosedEmoji ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`
    ).join(``);
  }

  createTemplate() {
    const emojiListTemplate = this.createEmojiListTemplate();
    return `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${this._data.choosedEmoji ? this.createImgTemplate() : ``}</div>

        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
      inputMessage: evt.target.value
    }, true);
  }

  _enableEmojiToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      choosedEmoji: evt.target.value
    });
  }

  _setInnerHandlers() { // внутренние обработчики
    this._enableEmojiToggler();
    this._handleInputFormMessage();
  }

  reset() {
    this._data = null;
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = ``;
    this._destroyHandlers();
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _destroyHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).removeEventListener(`change`, this._enableEmojiToggleHandler);
    this.getElement().querySelector(`.film-details__comment-input`).removeEventListener(`change`, this._inputFormMessageHandler);
  }

}
