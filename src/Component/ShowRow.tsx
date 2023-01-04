import { FC } from "react";
import Show from "./modules";
import { Link, useNavigate } from "react-router-dom";
type ShowRowProps = {
  show: Show;
};
const ShowRow: FC<ShowRowProps> = ({ show }) => {
  const navigate = useNavigate();
  const { id, name, language } = show;
  return (
    <div
      onClick={() => navigate("/shows/" + id)}
      className=" 
   cursor-pointer bg-gray-200 p-4 "
    >
      <div className="bg-white flex flex-col sm:flex-row p-4">
        <div className="sm:w-20">
          <img
            className="w-full aspect-aqure"
            src={
              show.image?.medium ||
              "https://cdn.discordapp.com/attachments/943172350139052092/1060230642576654376/IMG_20230104_214743.jpg"
            }
          />
        </div>
        <div className="sm:ml-8 flex  flex-col p-2">
          <h1 className="sm:text-2xl font-bold">show name: {name}</h1>
          <h1 className="sm:text-2xl ">language:{language}</h1>
        </div>
      </div>
    </div>
  );
};
ShowRow.defaultProps = {};
export default ShowRow;