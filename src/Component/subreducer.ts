import Show from "../modules/Show";
import { AnyAction } from "redux";
import {
  SHOWS_TYPES_FATCH,
  SHOWS_TYPES_FATCHED,
  SHOW_CAST_TYPES_FATCH,
  SHOW_CAST_TYPES_FATCHED,
  SHOW_TYPES_FATCHED,
} from "./actions";
export type showState = {
  shows: { [id: number]: Show };
  query: string;
  againstQuery: { [showid: string]: number[] };
  showsCast: Show[];
  loading: boolean;
};

export const initialShowsState: showState = {
  shows: {},
  query: "",
  againstQuery: {},
  showsCast: [],
  loading: false,
};
const showReducer = (state = initialShowsState, action: AnyAction) => {
  switch (action.type) {
    case SHOWS_TYPES_FATCH:
      return { ...state, query: action.payload };

    case SHOWS_TYPES_FATCHED:
      const { query, Shows }: { query: string; Shows: Show[] } = action.payload;
      const Normalize = Shows.reduce((previous: any, current: any) => {
        return { ...previous, [current.id]: current };
      }, {});
      const ids = Shows.map((s: Show) => s.id);

      return {
        ...state,
        shows: { ...state.shows, ...Normalize },
        againstQuery: { ...state.againstQuery, [query]: ids },
      };
    case SHOW_TYPES_FATCHED:
      const show: Show = action.payload;
      return { ...state, shows: { [show.id]: show } };
    case SHOW_CAST_TYPES_FATCHED:
      const showCast = action.payload;
      return { ...state, showsCast: [...showCast] };
    default:
      return state;
  }
};
export default showReducer;
