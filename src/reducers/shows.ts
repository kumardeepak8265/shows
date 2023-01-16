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
import produce from "immer";
import { schema, normalize } from "normalizr";

type State = {
  shows: { [id: number]: Show };
  query: string;
  againstQuery: { [showid: string]: number[] };
  // showsActorIds: { [showid: number]: number[] };
  loading: boolean;
};

const initialShowsState: State = {
  shows: {},
  query: "",
  againstQuery: {},
  // showsActorIds: {},
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
      const { query, Shows }: { query: string; Shows: Show[] } = action.payload;
      const showEntity = new schema.Entity("shows");
      const normalizeData = normalize(Shows, [showEntity]);
      const showIdsArray = normalizeData.result;
      return produce(state, (draft) => {
        const { query, Shows }: { query: string; Shows: Show[] } =
          action.payload;
        draft.shows = normalizeData.entities.shows || {};
        draft.againstQuery[query] = normalizeData.result;
        draft.loading = false;
      });

    case SHOW_TYPES_FATCHED:
      const show: Show = action.payload;
      return produce(state, (draft) => {
        draft.shows[show.id] = show;
      });

    // case SHOW_CAST_TYPES_FATCHED:
    //   const { showId, personAry } = action.payload as {
    //     showId: number;
    //     personAry: ActorObj[];
    //   };
    //   const actorIds = personAry.map((a: any) => a.id);
    //   return produce(state, (draft) => {
    //     draft.showsActorIds[showId] = actorIds;
    //   });

    default:
      return state;
  }
};
export default showReducer;
