import { State } from "./store";

export const showsSelector = (s: State) => {
  const showId = s.againstQuery[s.query] || [];
  return showId.map((id) => s.shows[+id]);
};
export const showQuery = (s: State) => s.query;
export const showState = (s: State) => s.shows;
