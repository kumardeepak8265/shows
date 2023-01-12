import { FC } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CastPersonObg from "../modules/Actor";
type CastProps = {
  cast: CastPersonObg[];
};
const Cast: FC<CastProps> = ({ cast }) => {
  if (!cast) {
    return <div>loading...</div>;
  }
  return (
    <div className="bg-white m-4 flex flex-wrap">
      {cast.map((p) => (
        <div className="flex " key={p.id}>
          <div className="p-4 m-4 w-40 border-2 border-gray-200 flex flex-col justify-center ">
            <div className="w-38">
              <img
                className="w-full aspect-aqure object-cover "
                src={
                  p.image?.medium ||
                  "https://cdn.discordapp.com/attachments/943172350139052092/1060230642576654376/IMG_20230104_214743.jpg"
                }
              />
            </div>
            <h1>{p.name}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cast;
