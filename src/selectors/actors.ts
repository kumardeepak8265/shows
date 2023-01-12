import { createSelector } from "reselect";
import { State } from "../Component/store";
import ActorObj from "../modules/Actor";
import { showActorIds } from "./shows";

const actorMapState = (s: State) => s.actors;
const actorSelector = createSelector(
  actorMapState,
  (actorState) => actorState.showsCast
);
export const showsCastSelector = createSelector(
  showActorIds,
  actorSelector,
  (showActorIds, actorSelector) => {
    return Object.keys(showActorIds).reduce<{ [id: number]: ActorObj[] }>(
      (showActors, showId) => {
        const actorIdsArr = showActorIds[+showId];
        const actors = actorIdsArr.map((Id) => actorSelector[+Id]);
        return { ...showActors, [+showId]: actors };
      },
      {}
    );
  }
);
