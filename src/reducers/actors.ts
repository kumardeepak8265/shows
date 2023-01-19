import { cast } from "../modules/Actor";
import { AnyAction } from "redux";
import { schema, normalize } from "normalizr";
import produce from "immer";
import { SHOWS_TYPES_FATCHED, SHOW_DETAIL_FATCHED } from "../actions/shows";
import { ShowsWithCast } from "../modules/Show";

type State = {
  showsCast: { [showIds: number]: cast[] };
};
const initialsState: State = {
  showsCast: {},
};
const Castreducer = (state = initialsState, action: AnyAction) => {
  switch (action.type) {
    case SHOWS_TYPES_FATCHED:
      return produce(state, (draft) => {
        const showArrayWithCast = action.payload
          .ShowsWithCast as ShowsWithCast[];
        const cast = showArrayWithCast.map((item) => item.cast);
        const castEntity = new schema.Entity("cast");
        const normalizeCast = normalize(cast, [castEntity]);
        draft.showsCast = normalizeCast.entities.cast || {};
      });
    case SHOW_DETAIL_FATCHED:
      const cast = action.payload.cast;
      return produce(state, (draft) => {
        draft.showsCast[cast.id] = cast;
      });

    default:
      return state;
  }
};
export default Castreducer;
