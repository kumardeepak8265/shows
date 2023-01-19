import { createSelector } from "reselect";
import { State } from "../Component/store";
export const showMapState = (s: State) => s.shows;
export const showQuery = createSelector(showMapState, (shows) => shows.query);
export const showState = createSelector(showMapState, (shows) => shows.shows);
export const ids = createSelector(
  showMapState,
  (shows) => shows.againstQuery[shows.query] || []
);
export const showsSelector = createSelector(ids, showState, (ids, shows) =>
  ids.map((ids) => shows[+ids])
);

export const showsLoading = createSelector(
  showMapState,
  (shows) => shows.loading
);





