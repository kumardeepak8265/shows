import createSagaMiddleware from "@redux-saga/core";
import { AnyAction } from "redux";
import { call, put, delay, takeLatest } from "redux-saga/effects";
import {
  showFatchedAction,
  showsFatchedAction,
  SHOWS_TYPES_FATCH,
  SHOW_TYPES_FATCH,
} from "./actions";
import { getShow, getShows } from "./api";

export const sagaMiddleware = createSagaMiddleware();
function* showSagafatch(action: AnyAction): Generator<any, any, any> {
  if (!action.payload) {
    return;
  }
  const id = action.payload;
  const res = yield call(getShow, id);
  yield put(showFatchedAction(res));
}
function* showsSagafatch(action: AnyAction): Generator<any, any, any> {
  yield delay(1000);
  if (!action.payload) {
    return;
  }
  const query = action.payload;
  const res = yield call(getShows, query);
  yield put(showsFatchedAction(query, res));
}
export function* rootSaga() {
  yield takeLatest(SHOWS_TYPES_FATCH, showsSagafatch);
  yield takeLatest(SHOW_TYPES_FATCH, showSagafatch);
}
