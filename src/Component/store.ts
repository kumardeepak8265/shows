import { AnyAction, applyMiddleware, createStore } from "redux";
import {
  SHOWS_TYPES_FATCH,
  SHOWS_TYPES_FATCHED,
  SHOW_TYPES_FATCH,
  SHOW_TYPES_FATCHED,
} from "./actions";
import Show from "./modules";
import { rootSaga, sagaMiddleware } from "./saga";
export type State = {
  shows: { [id: number]: Show };
  query: string;
  againstQuery: { [showid: string]: number[] };
};
const initalState: State = {
  shows: {},
  query: "",
  againstQuery: {},
};
function reducer(state = initalState, action: AnyAction) {
  switch (action.type) {
    case SHOWS_TYPES_FATCH:
      return { ...state, query: action.payload };

    case SHOWS_TYPES_FATCHED:
      const { query, Shows } = action.payload;

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

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
