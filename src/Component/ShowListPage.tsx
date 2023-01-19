import { ChangeEvent, FC } from "react";
import { connect, ConnectedProps, ConnectProps } from "react-redux";
import Show from "../modules/Show";
import { showsFatchAction } from "../actions/shows";
import { showQuery, showsLoading, showsSelector } from "../selectors/shows";
import ShowRow from "./ShowRow";
import { State } from "./store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { showCast } from "../selectors/actors";

type ShowListPageProps = ReduxProps;
export const ShowListPage: FC<ShowListPageProps> = ({
  shows,
  query,
  fatchShow,
  loading,
  cast,
}) => {
  if (!shows) {
    return <AiOutlineLoading3Quarters className="animate-spin" />;
  }
  const onhandleClick = (event: ChangeEvent<HTMLInputElement>) => {
    fatchShow(event.target.value);
  };

  return (
    <div className=" p-8  ">
      <div className="bg-white space-y-4 p-8">
        {!loading && <div className="h-8"></div>}
        {loading && (
          <div className="h-8">please wait data load ho raha hai</div>
        )}
        <input
          placeholder="SEARCH"
          className="p-2 rounded-md border-2 border-gray-600 w-full"
          value={query}
          onChange={onhandleClick}
        />
        {loading && <AiOutlineLoading3Quarters className="animate-spin" />}

        {shows.length === 0 && (
          <div className="mt-40 text-3xl font-bold">
            🍿Search For Your Favorite MOVIE/SERIES🎬
          </div>
        )}
        <div className=" p-8 flex flex-wrap justify-center gap-4">
          {shows &&
            shows.map((show: any) => (
              <ShowRow
                key={show.id}
                query={show}
                show={show}
                cast={cast[show.id]}
              ></ShowRow>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  fatchShow: showsFatchAction,
};
const mapStateToProps = (s: State) => ({
  shows: showsSelector(s),
  query: showQuery(s),
  loading: showsLoading(s),
  cast: showCast(s),
});
const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;
export default connector(ShowListPage);
