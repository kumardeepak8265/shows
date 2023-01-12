import CastPersonObg from "../modules/Actor";

export const SHOW_CAST_TYPES_FATCHED = "SHOW_CAST_TYPES_FATCHED";
export const SHOW_CAST_TYPES_FATCH = "SHOW_CAST_TYPES_FATCH";
export const showCastFatchedAction = (
  showId: number,
  personAry: CastPersonObg[]
) => ({
  type: SHOW_CAST_TYPES_FATCHED,
  payload: { showId, personAry },
});

export const showCastFatchAction = (id: number) => ({
  type: SHOW_CAST_TYPES_FATCH,
  payload: id,
});
