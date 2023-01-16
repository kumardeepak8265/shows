import CastPersonObg from "../modules/Actor";
import { AnyAction } from "redux";
import { SHOW_CAST_TYPES_FATCHED } from "../actions/actors";
import ActorObj from "../modules/Actor";
import { schema, normalize } from "normalizr";
import produce from "immer";
type State = {
  showsCast: { [ids: number]: CastPersonObg };
};
const initialsState: State = {
  showsCast: {},
};
const Castreducer = (state = initialsState, action: AnyAction) => {
  switch (action.type) {
    case SHOW_CAST_TYPES_FATCHED:
      const { personAry } = action.payload as { personAry: ActorObj[] };
      const actorEntity = new schema.Entity("cast");
      const NormaliseData = normalize(personAry, [actorEntity]);
      return produce(state, (draft) => {
        draft.showsCast = NormaliseData.entities.cast || {};
      });

    default:
      return state;
  }
};
export default Castreducer;
