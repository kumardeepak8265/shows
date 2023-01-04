import { FC } from "react";
import { connect } from "react-redux";
import { showsFatchAction } from "./actions";
import Show from "./modules";
import { showQuery, showsSelector } from "./selectors";
import ShowRow from "./ShowRow";
import { State } from "./store";
type ShowListPageProps = {
  shows: Show[];
  query: string;
  fatchShow: (id: string) => void;
};
export const ShowListPage: FC<ShowListPageProps> = ({
  shows,
  query,
  fatchShow,
}) => {
  if (!shows) {
    return <div>loading...</div>;
  }

  return (
    <div className=" p-8 h-full bg-gray-400 ">
      <div className="bg-white space-y-4 p-8">
        <input
          placeholder="SEARCH"
          className="p-2 rounded-md border-2 border-gray-600 w-4/5"
          value={query}
          onChange={() => fatchShow(event.target.value)}
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
