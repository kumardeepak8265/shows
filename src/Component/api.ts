import axios from "axios";
import CastPersonObg from "../modules/Cast";
import Cast from "../modules/Cast";
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

export const getShowsCast = async (id: number) => {
  const res = await axios.get<{ r: CastPersonObg }>(
    `https://api.tvmaze.com/shows/${id}/cast`
  );
  return res.data.map((r) => r.person);
};
