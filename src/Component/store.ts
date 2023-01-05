import { AnyAction, applyMiddleware, createStore } from "redux";
import {
  SHOWS_TYPES_FATCH,
  SHOWS_TYPES_FATCHED,
  SHOW_TYPES_FATCH,
  SHOW_TYPES_FATCHED,
} from "./actions";
import Show from "./modules";
import { rootSaga, sagaMiddleware } from "./saga";
import showReducer, { initialShowsState, showState } from "./subreducer";

export type State = {
  shows: showState;
};
const initalState: State = {
  shows: initialShowsState,
};
function reducer(state = initalState, action: AnyAction) {
  return { shows: showReducer(state.shows, action) };
}

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
