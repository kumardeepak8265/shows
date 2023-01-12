import axios from "axios";
import CastPersonObg from "../modules/Actor";
import Cast from "../modules/Actor";
import Show from "../modules/Show";

export const getShows = async (query: string) => {
  const res = await axios.get<{ show: Show }[]>(
    "https://api.tvmaze.com/search/shows?q=" + query
  );
  return res.data.map((d) => d.show);
};

export const getShow = async (id: number) => {
  const res = await axios.get("https://api.tvmaze.com/shows/" + id);
  return res.data;
};

export const getShowsCast = async (showid: number) => {
  const response = await axios.get(
    `https://api.tvmaze.com/shows/${showid}/cast`
  );
  return response.data;
};
