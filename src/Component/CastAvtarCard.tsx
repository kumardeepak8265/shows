import { Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import { FC, memo } from "react";
import ActorObj from "../modules/Actor";

type CastAvtarCardProps = {
  cast: ActorObj[];
  className?: string;
};

const CastAvtarCard: FC<CastAvtarCardProps> = ({ cast, className }) => {
  return (
    <div
      className={
        "md:w-52 w-32 bg-white border border-gray-700 rounded-md space-x-1 z-50  p-1" +
        className
      }
    >
      {cast?.map((p) => {
        return (
          <div
            key={p.id}
            className="flex items-center justify-between md:px-4 md:py-1 border-b-21 border-black "
          >
            <Avatar
              alt="xyz"
              src={p.image?.medium}
              sx={{ width: 28, height: 28 }}
            />
            <p className="text-base font-semibold"> {p.name} </p>
          </div>
        );
      })}
    </div>
  );
};

CastAvtarCard.defaultProps = {};

export default memo(CastAvtarCard);
