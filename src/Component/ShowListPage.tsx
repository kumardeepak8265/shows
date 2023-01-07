import { ChangeEvent, FC } from "react";
import { connect } from "react-redux";
import { showsFatchAction } from "./actions";
import Show from "../modules/Show";
import { showQuery, showsLoading, showsSelector } from "./selectors";
import ShowRow from "./ShowRow";
import { State } from "./store";
type ShowListPageProps = {
  shows: Show[];
  query: string;
  fatchShow: (id: string) => void;
  loading: boolean;
};
export const ShowListPage: FC<ShowListPageProps> = ({
  shows,
  query,
  fatchShow,
  loading,
}) => {
  if (!shows) {
    return <div>loading...</div>;
  }
  const onhandleClick = (event: ChangeEvent<HTMLInputElement>) => {
    fatchShow(event.target.value);
  };
  console.log("loading", loading);
  return (
    <div className=" p-8  ">
      <div className="bg-white space-y-4 p-8">
        <input
          placeholder="SEARCH"
          className="p-2 rounded-md border-2 border-gray-600 w-full"
          value={query}
          onChange={onhandleClick}
        />
        {shows.map((s) => (
          <ShowRow key={s.id} show={s}></ShowRow>
        ))}
      </div>
    </div>
  );
};
ShowListPage.defaultProps = {};

const mapDispatchToProps = {
  fatchShow: showsFatchAction,
};
const mapStateToProps = (s: State) => ({
  shows: showsSelector(s),
  query: showQuery(s),
  loading: showsLoading(s),
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
