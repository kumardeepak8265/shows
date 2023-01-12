import Show from "../modules/Show";
import { AnyAction } from "redux";
import {
  SHOWS_TYPES_FATCH,
  SHOWS_TYPES_FATCHED,
  SHOW_QUERY_FATCH,
  SHOW_TYPES_FATCHED,
} from "../actions/shows";
import { SHOW_CAST_TYPES_FATCHED } from "../actions/actors";
import ActorObj from "../modules/Actor";

type State = {
  shows: { [id: number]: Show };
  query: string;
  againstQuery: { [showid: string]: number[] };
  showsActorIds: { [showid: number]: number[] };
  loading: boolean;
};

const initialShowsState: State = {
  shows: {},
  query: "",
  againstQuery: {},
  showsActorIds: {},
  loading: false,
};
const showReducer = (state = initialShowsState, action: AnyAction) => {
  switch (action.type) {
    case SHOWS_TYPES_FATCH:
      return { ...state, query: action.payload, loading: true };

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
        loading: false,
      };
    case SHOW_TYPES_FATCHED:
      const show: Show = action.payload;
      return {
        ...state,
        shows: { ...state.shows, [show.id]: show },
      };
    case SHOW_CAST_TYPES_FATCHED:
      const { showId, personAry } = action.payload as {
        showId: number;
        personAry: ActorObj[];
      };
      const actorIds = personAry.map((a: any) => a.id);
      return {
        ...state,
        showsActorIds: { ...state.showsActorIds, [showId]: actorIds },
      };

    default:
      return state;
  }
};
export default showReducer;
