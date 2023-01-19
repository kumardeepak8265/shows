import { Stack, Avatar } from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import { FC, useState } from "react";
import ActorObj from "../modules/Actor";
import CastAvtarCard from "./CastAvtarCard";

type CastAvtarProps = {
  cast: ActorObj[];
};

const CastAvtar: FC<CastAvtarProps> = ({ cast }) => {
  const [avtarCard, setAvtarCard] = useState(false);
  const onhandleClick = () => {
    setAvtarCard(!avtarCard);
  };

  if (!cast) {
    return <div>loading...</div>;
  }
  if (cast.length == 0) {
    return <div>no cast this show</div>;
  }
  return (
    <div className="flex flex-col" onClick={onhandleClick}>
      <AvatarGroup max={3} total={cast?.length}>
        {cast.map((c) => (
          <Avatar
            key={c.id}
            src={
              c.image?.medium ||
              "https://cdn.discordapp.com/attachments/943172350139052092/1060230642576654376/IMG_20230104_214743.jpg"
            }
          ></Avatar>
        ))}
      </AvatarGroup>
      {avtarCard && <CastAvtarCard cast={cast} />}
    </div>
  );
};

export default CastAvtar;
