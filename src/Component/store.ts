import { AnyAction, applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { rootSaga, sagaMiddleware } from "./saga";
import showReducer, { initialShowsState, showState } from "./subreducer";

const reducer2 = combineReducers({
  shows: showReducer,
});

export type State = ReturnType<typeof reducer2>;
const store = createStore(reducer2, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
