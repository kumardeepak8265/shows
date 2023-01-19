import { createSelector } from "reselect";
import { State } from "../Component/store";


const actorMapState = (s: State) => s.actors;

const actorObj = createSelector(
  actorMapState,
  (actorState) => actorState.showsCast
);



export const showsCastSelector = createSelector(actorObj, (actorObj) =>
  Object.keys(actorObj).map((id) => actorObj[+id])
);
export const showCast = createSelector(actorMapState, (s) => s.showsCast);
