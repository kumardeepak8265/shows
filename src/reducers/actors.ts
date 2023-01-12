import CastPersonObg from "../modules/Actor";
import { AnyAction } from "redux";
import { SHOW_CAST_TYPES_FATCHED } from "../actions/actors";
import ActorObj from "../modules/Actor";

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
      const Normalize = personAry.reduce((previous: any, current: any) => {
        return { ...previous, [current.id]: current };
      }, {});
      return { ...state, showsCast: Normalize };
    default:
      return state;
  }
};
export default Castreducer;
