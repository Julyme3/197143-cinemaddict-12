import {render, replace, remove, appendChild} from "../utils/render";
import {UserAction, END_POINT, AUTHORIZATION} from "../const";
import CommentsView from "../view/comments";
import NewCommentView from "../view/new-comment";
import Api from "../api";

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Comment {
  constructor(container, commentsModel, film) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._newCommentComponent = null;
    this._api = new Api(END_POINT, AUTHORIZATION);
    this._film = film;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._commentsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._comments = this._commentsModel.getComments();

    const prevCommentsComponent = this._commentsComponent;
    const prevNewCommentsComponent = this._newCommentComponent;
    this._commentsComponent = new CommentsView(this._comments);
    this._newCommentComponent = new NewCommentView();

    this._commentsComponent.setDeleteClickHandler(this._handleViewAction);
    this._newCommentComponent.setAddCommentHandler(this._handleViewAction);

    if (prevCommentsComponent === null && prevNewCommentsComponent === null) {
      render(this._container, this._commentsComponent, `beforeend`);
      appendChild(this._container, this._newCommentComponent);
      return;
    }

    replace(this._commentsComponent, prevCommentsComponent);
    replace(this._newCommentComponent, prevNewCommentsComponent);
    remove(prevCommentsComponent);
    remove(prevNewCommentsComponent);
  }

  _handleViewAction(actionType, updated) {
    switch (actionType) {
      case UserAction.ADD_COMMENT:
        this._setViewState(State.SAVING);
        this._api.addComment(this._film, updated)
          .then((response) => {
            this._commentsModel.addComment(response);
          })
          .catch(() => {
            this._setViewState(State.ABORTING);
          });
        break;
      case UserAction.DELETE_COMMENT:
        this._setViewState(State.DELETING, updated);
        this._api.deleteComment(updated)
          .then(() => {
            this._commentsModel.deleteComment(updated);
          })
          .catch(() => {
            this._setViewState(State.ABORTING, updated);
          });
        break;
    }
  }

  _handleModelEvent() {
    this.init();
  }

  _setAbortingDeleteComment(el) {
    const resetBtnDeleting = () => {
      this._commentsComponent.updateData({
        isDeleting: null
      }, true);

      this._commentsComponent.getElement().querySelector(`.film-details__comment-delete:disabled`).removeAttribute(`disabled`);
    };
    this._commentsComponent.shake(resetBtnDeleting, el);
  }

  _setAbortingAddComment() {
    const resetCommentForm = () => {
      this._newCommentComponent.updateData({
        isDeleting: null,
        isDisabled: false
      });

      this._newCommentComponent.getElement().querySelectorAll(`img`).forEach((img) => {
        img.style.fontSize = `12px`;
      });
    };

    this._newCommentComponent.shake(resetCommentForm);
  }

  _setViewState(state, updated) {
    switch (state) {
      case State.DELETING:
        this._commentsComponent.updateData({
          isDeleting: {
            [updated]: true
          }
        });
        break;
      case State.SAVING:
        this._newCommentComponent.updateData({
          isDisabled: true
        });
        break;
      case State.ABORTING:
        if (updated) {
          const commentEl = this._commentsComponent.getElement().querySelector(`.film-details__comment-delete[data-id="${updated}"]`).closest(`.film-details__comment`);
          this._setAbortingDeleteComment(commentEl);
        } else {
          this._setAbortingAddComment();
        }
    }
  }

  resetInputComment() {
    this._newCommentComponent.reset();
  }
}
