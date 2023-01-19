import { FC } from "react";
import Show from "../modules/Show";
import { Link } from "react-router-dom";

import CastAvtar from "./CastAvtar";
type ShowRowProps = {
  show: Show;
  query: string;
  cast: any;
};
const ShowRow: FC<ShowRowProps> = ({ show, query, cast }) => {
  const { id, name, language } = show;

  return (
    <div
      className=" 
    bg-gray-200 p-2 w-80 "
    >
      <div className="bg-white flex flex-col p-4">
        <img
          className="w-full aspect-aqure object-cover"
          src={
            show.image?.medium ||
            "https://cdn.discordapp.com/attachments/943172350139052092/1060230642576654376/IMG_20230104_214743.jpg"
          }
        />

        <div className="sm:ml-8 flex  flex-col justify-center items-center p-2">
          <h1 className="sm:text-2xl font-bold">show name: {name}</h1>
          <h1 className="sm:text-2xl ">language:{language}</h1>
          <CastAvtar cast={cast.cast}></CastAvtar>
          <Link to={`/shows/${id}`}>details</Link>
        </div>
      </div>
    </div>
  );
};
ShowRow.defaultProps = {};
export default ShowRow;
