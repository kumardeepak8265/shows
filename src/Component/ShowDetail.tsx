import { FC, memo, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter, WithRouterProps } from "../hoc/WithRouter";
import { showCastFatchAction, showFatchAction } from "./actions";
import Show from "../modules/Show";
import { showsCastSelector, showsLoading, showState } from "./selectors";
import { State } from "./store";
import { BiArrowFromRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CastPersonObg from "../modules/Cast";
import Cast from "./Cast";
type ShowDetailProps = {
  showcast: CastPersonObg[];
  show: Show;
  params: number;
  dispatch: (id: number) => void;
  dispatchCast: (id: number) => void;
} & WithRouterProps;
const ShowDetail: FC<ShowDetailProps> = ({
  showcast,
  show,
  params,
  dispatch,
  dispatchCast,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!show) {
      console.log("change");
      dispatch(+params.id);
    } else if (show) {
      dispatchCast(+params.id);
    }
  }, [show, params.id]);

  if (!show) {
    return <div>...loading</div>;
  }
  const { name, language, summary } = show;

  return (
    <div>
      <div className="bg-gray-200 p-4 ">
        <div className="p-4 bg-white flex flex-col sm:flex-row">
          <BiArrowFromRight
            className="text-2xl mr-4"
            onClick={() => navigate("/")}
          />
          <div className="sm:w-1/4">
            <img
              className="w-full aspect-aqure"
              src={
                show.image?.medium ||
                "https://cdn.discordapp.com/attachments/943172350139052092/1060230642576654376/IMG_20230104_214743.jpg"
              }
            />
          </div>
          <div className="sm:ml-8 flex w-3/4 flex-col mt-4">
            <h1 className="sm:text-2xl font-bold">show name: {name}</h1>
            <h1 className="sm:text-2xl ">language:{language}</h1>
            <h1>{summary}</h1>
          </div>
        </div>
      </div>
      {<Cast cast={showcast}></Cast>}
    </div>
  );
};
ShowDetail.defaultProps = {};

const mapStateToProps = (s: State, props: any) => ({
  show: showState(s)[props.params.id],
  showcast: showsCastSelector(s),
});
const mapDispatchToProps = {
  dispatch: showFatchAction,
  dispatchCast: showCastFatchAction,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(ShowDetail))
);
