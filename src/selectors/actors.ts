import { createSelector } from "reselect";
import { State } from "../Component/store";
import ActorObj from "../modules/Actor";
import { showActorIds } from "./shows";

const actorMapState = (s: State) => s.actors;

const actorObj = createSelector(
  actorMapState,
  (actorState) => actorState.showsCast
);
// export const showsCastSelector = createSelector(
//   showActorIds,
//   actorSelector,
//   (showActorIds, actorSelector) => {
//     const data = Object.keys(showActorIds).reduce<{ [id: number]: ActorObj[] }>(
//       (showActors, showId) => {
//         const actorIdsArr = showActorIds[+showId];
//         console.log("actorselector", actorSelector);
//         const actors = actorIdsArr.map((Id) => actorSelector[+Id]) || {};
//         const data2 = actors || {};
//         console.log("actors", data2);
//         return { ...showActors, [+showId]: actors };
//       },
//       {}
//     );
//     return data;
//   }
// );

export const showsCastSelector = createSelector(actorObj, (actorObj) =>
  Object.keys(actorObj).map((id) => actorObj[+id])
);
