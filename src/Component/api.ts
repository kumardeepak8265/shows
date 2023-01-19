import axios from "axios";
import CastPersonObg from "../modules/Actor";
import Cast from "../modules/Actor";
import Show from "../modules/Show";

const BASE_URL = "https://api.tvmaze.com";

export const getShowsWithCast = async (query: string) => {
  const response = await axios.get(BASE_URL + "/search/shows?q=" + query);
  const shows: Show[] = response.data.map((i: any) => {
    return i.show;
  });
  const data = [];
  for (let i = 0; i < shows.length; i++) {
    data.push(getCastShow(shows[i]));
  }

  return Promise.all(data);
};

export const getCastShow = async (show: Show) => {
  const response = await axios.get(BASE_URL + "/shows/" + show.id + "/cast");
  const cast = response.data.map((item: any) => item.person);
  return { show, cast: { id: show.id, cast } };
};

export const getShowDetail = async (id: number) => {
  const showRes = await axios.get(BASE_URL + "/shows/" + id);
  const show = showRes.data;
  const showDetailWithcast = getCastShow(show);
  return showDetailWithcast;
};
