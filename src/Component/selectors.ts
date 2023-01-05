import { State } from "./store";
export const showsSelector = (s: State) => {
  const showId = s.shows.againstQuery[s.shows.query] || [];
  return showId.map((id) => s.shows.shows[+id]);
};
export const showQuery = (s: State) => s.shows.query;
export const showState = (s: State) => s.shows.shows;
