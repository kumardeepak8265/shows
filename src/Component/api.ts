import axios from "axios";
import Show from "./modules";

export const getShows = async (query: string) => {
  const res = await axios.get<{ show: Show }[]>(
    "https://api.tvmaze.com/search/shows?q=" + query
  );
  return res.data.map((d) => d.show);
};

export const getShow = async (id: number) => {
  console.log("id", id);
  const res = await axios.get("https://api.tvmaze.com/shows/" + id);
  return res.data;
};
