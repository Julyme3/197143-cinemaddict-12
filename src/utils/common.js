import moment from "moment";
import {KeyCode} from "../const";

const formattedDate = (date, format) => moment(date).format(format);

const huminazeFormattedDate = (date, format) => moment(date, format).fromNow();

const formattedDuration = (duration, format) => moment.utc().startOf(`day`).add(duration, `minutes`).format(format);

const isCtrlEnter = (evt) => {
  return (evt.ctrlKey || evt.metaKey) && evt.keyCode === KeyCode.ENTER;
};

export {formattedDate, formattedDuration, huminazeFormattedDate, isCtrlEnter};
