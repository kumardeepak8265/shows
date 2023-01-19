import Show, { ShowsWithCast } from "../modules/Show";
import { AnyAction } from "redux";
import {
  SHOWS_TYPES_FATCH,
  SHOWS_TYPES_FATCHED,
  SHOW_DETAIL_FATCHED,
} from "../actions/shows";

import produce from "immer";
import { schema, normalize } from "normalizr";

type State = {
  shows: { [id: number]: Show };
  query: string;
  againstQuery: { [showid: string]: number[] };
  loading: boolean;
};

const initialShowsState: State = {
  shows: {},
  query: "",
  againstQuery: {},
  loading: false,
};
const showReducer = (state = initialShowsState, action: AnyAction) => {
  switch (action.type) {
    case SHOWS_TYPES_FATCH:
      return produce(state, (draft) => {
        const queryValue = action.payload;
        draft.query = queryValue;
        if (queryValue) {
          draft.loading = true;
        } else if (!queryValue) {
          draft.loading = false;
        }
      });

    case SHOWS_TYPES_FATCHED:
      return produce(state, (draft) => {
        const showArrayWithCast = action.payload
          .ShowsWithCast as ShowsWithCast[];
        const query = action.payload.query;
        const shows = showArrayWithCast.map((item) => item.show);
        const showEntity = new schema.Entity("show");
        const normalizeShow = normalize(shows, [showEntity]);
        draft.againstQuery[query] = normalizeShow.result;
        draft.shows = normalizeShow.entities.show || {};
        draft.loading = false;
      });

    case SHOW_DETAIL_FATCHED:
      const show = action.payload.show as Show;
      return produce(state, (draft) => {
        draft.shows[show.id] = show;
      });

    default:
      return state;
  }
};
export default showReducer;
