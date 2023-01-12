import { FC, memo, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, WithRouterProps } from "../hoc/WithRouter";
import { showFatchAction, showsFatchAction } from "../actions/shows";
import Show from "../modules/Show";
import { showsSelector, showState } from "../selectors/shows";
import { State } from "./store";
import { BiArrowFromRight } from "react-icons/bi";
import { useNavigate, useSearchParams } from "react-router-dom";
import CastPersonObg from "../modules/Actor";
import { showCastFatchAction } from "../actions/actors";
import { showsCastSelector } from "../selectors/actors";
import { LinkWithQuery } from "./LinkWithQuery";
import Cast from "./Cast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type ShowDetailProps = {
  showcast: CastPersonObg[];
  show: Show;
  params: number;
  dispatchQuery: (query: string) => void;
  dispatch: (id: number) => void;
  dispatchCast: (id: number) => void;
  prev: string;
  next: string;
} & WithRouterProps;
const ShowDetail: FC<ShowDetailProps> = ({
  showcast,
  show,
  params,
  dispatch,
  dispatchCast,
  dispatchQuery,
  prev,
  next,
}) => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  useEffect(() => {
    const showId = +params.id;
    dispatch(showId);
    dispatchCast(showId);
  }, [params.id]);

  useEffect(() => {
    const query = search.get("q");
    if (!show && query) {
      dispatchQuery(query);
    }
  }, []);

  if (!show) {
    return <AiOutlineLoading3Quarters className="animate-spin" />;
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
            <p dangerouslySetInnerHTML={{ __html: summary || "" }}></p>
            <span className="flex grow"></span>
            <div className="flex justify-between items-center p-4 ">
              {prev ? (
                <LinkWithQuery to={prev}>Prev</LinkWithQuery>
              ) : (
                <span></span>
              )}
              {next ? (
                <LinkWithQuery to={next}>Next</LinkWithQuery>
              ) : (
                <span></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {<Cast cast={showcast}></Cast>}
    </div>
  );
};
ShowDetail.defaultProps = {};

const mapStateToProps = (s: State, props: any) => {
  const showId = props.params.id;
  const shows = showsSelector(s);

  let prevShow, nextShow;
  for (let i = 0; i < shows.length; i++) {
    const show = shows[i];
    if (show.id == showId) {
      if (i + 1 < shows.length) {
        nextShow = shows[i + 1];
      }
      if (i >= 1) {
        prevShow = shows[i - 1];
      }
      break;
    }
  }

  return {
    show: showState(s)[showId],
    showcast: showsCastSelector(s)[showId],
    prev: prevShow && `/shows/${prevShow.id}`,
    next: nextShow && `/shows/${nextShow.id}`,
  };
};
const mapDispatchToProps = {
  dispatch: showFatchAction,
  dispatchCast: showCastFatchAction,
  dispatchQuery: showsFatchAction,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(ShowDetail))
);
