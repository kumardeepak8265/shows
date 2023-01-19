import createSagaMiddleware from "@redux-saga/core";
import { AnyAction } from "redux";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  showDetailFatchedAction,
  showsFatchedAction2,
  SHOWS_TYPES_FATCH,
  SHOW_DETAIL_FATCH,
} from "../actions/shows";

import { getShowDetail, getShowsWithCast } from "./api";

export const sagaMiddleware = createSagaMiddleware();

function* showDetailSagafatch(action: AnyAction): Generator<any, any, any> {
  if (!action.payload) {
    return;
  }
  const id = action.payload;
  const res = yield call(getShowDetail, id);
  yield put(showDetailFatchedAction(res));
}

function* showsSagafatch(action: AnyAction): Generator<any, any, any> {
  const query = action.payload;
  if (!action.payload) {
    return;
  }
  const showWithCast = yield call(getShowsWithCast, query);
  yield put(showsFatchedAction2(query, showWithCast));
}
export function* rootSaga() {
  yield takeLatest(SHOWS_TYPES_FATCH, showsSagafatch);
  yield takeLatest(SHOW_DETAIL_FATCH, showDetailSagafatch);
}
