import { AnyAction, applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootSaga, sagaMiddleware } from "./saga";
import showReducer from "../reducers/shows";
import Castreducer from "../reducers/actors";

const reducer2 = combineReducers({
  shows: showReducer,
  actors: Castreducer,
});

export type State = ReturnType<typeof reducer2>;
const store = createStore(
  reducer2,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);
export default store;
