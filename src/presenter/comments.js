import {render, replace, remove, appendChild} from "../utils/render";
import {UserAction} from "../const";
import CommentsView from "../view/comments";
import NewCommentView from "../view/new-comment";

export default class Comment {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._newCommentComponent = null;

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
        this._commentsModel.addComment(updated);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updated);
        break;
    }
  }

  _handleModelEvent() {
    this.init();
  }

  destroy() {
    remove(this._commentsComponent);
    remove(this._newCommentComponent);
  }
}
