import { ChangeEvent, FC } from "react";
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
  const onhandleClick = (event: ChangeEvent<HTMLInputElement>) => {
    fatchShow(event.target.value);
  };
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ShowListPage);
