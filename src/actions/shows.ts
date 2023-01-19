import Show, { ShowsWithCast } from "../modules/Show";

export const SHOWS_TYPES_FATCH = "SHOWS_TYPES_FATCH";
export const SHOWS_TYPES_FATCHED = "SHOWS_TYPES_FATCHED";
export const SHOW_DETAIL_FATCH = "SHOW_DETAIL_FATCH";
export const SHOW_DETAIL_FATCHED = "SHOW_DETAIL_FATCHED";
export const SHOW_QUERY_FATCH = "SHOW_QUERY_FATCH";
export const showDetailFatchAction = (id: number) => ({
  type: SHOW_DETAIL_FATCH,
  payload: id,
});
export const showQueryFatchAction = (query: string) => ({
  type: SHOW_QUERY_FATCH,
  payload: query,
});
export const showDetailFatchedAction = (showDetailWithCast: Show[]) => ({
  type: SHOW_DETAIL_FATCHED,
  payload: showDetailWithCast,
});
export const showsFatchAction = (query: string) => ({
  type: SHOWS_TYPES_FATCH,
  payload: query,
});

export const showsFatchedAction = (query: string, Shows: Show[]) => ({
  type: SHOWS_TYPES_FATCHED,
  payload: { query, Shows },
});

export const showsFatchedAction2 = (
  query: string,
  ShowsWithCast: ShowsWithCast[]
) => ({
  type: SHOWS_TYPES_FATCHED,
  payload: { query, ShowsWithCast },
});
