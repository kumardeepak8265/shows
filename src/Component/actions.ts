import Show from "./modules";

export const SHOWS_TYPES_FATCH = "SHOWS_TYPES_FATCH";
export const SHOWS_TYPES_FATCHED = "SHOWS_TYPES_FATCHED";
export const SHOW_TYPES_FATCH = "SHOW_TYPES_FATCH";
export const SHOW_TYPES_FATCHED = "SHOW_TYPES_FATCHED";
export const showFatchAction = (id: number) => ({
  type: SHOW_TYPES_FATCH,
  payload: id,
});
export const showFatchedAction = (show: Show[]) => ({
  type: SHOW_TYPES_FATCHED,
  payload: show,
});
export const showsFatchAction = (query: string) => ({
  type: SHOWS_TYPES_FATCH,
  payload: query,
});

export const showsFatchedAction = (query: string, Shows: Show[]) => ({
  type: SHOWS_TYPES_FATCHED,
  payload: { query, Shows },
});
