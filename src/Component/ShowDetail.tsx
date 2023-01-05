import { FC, memo, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, WithRouterProps } from "../hoc/WithRouter";
import { showFatchAction } from "./actions";
import Show from "./modules";
import { showState } from "./selectors";
import { State } from "./store";
import { BiArrowFromRight } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
type ShowDetailProps = {
  show: Show;
  params: number;
  dispatch: (id: number) => void;
} & WithRouterProps;
const ShowDetail: FC<ShowDetailProps> = ({ show, params, dispatch }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!show) {
      dispatch(+params.id);
    }
  }, [show]);

  const { name, language, summary } = show;

  return (
    <div className="bg-gray-200 p-4 ">
      <div className="p-4 bg-white flex flex-col sm:flex-row">
        <BiArrowFromRight
          className="text-2xl mr-4"
          onClick={() => navigate("/")}
        />
        <div className="sm:w-40">
          <img
            className="w-full aspect-aqure"
            src={
              show.image?.medium ||
              "https://cdn.discordapp.com/attachments/943172350139052092/1060230642576654376/IMG_20230104_214743.jpg"
            }
          />
        </div>
        <div className="sm:ml-8 flex  flex-col mt-4">
          <h1 className="sm:text-2xl font-bold">show name: {name}</h1>
          <h1 className="sm:text-2xl ">language:{language}</h1>
        </div>
      </div>
    </div>
  );
};
ShowDetail.defaultProps = {};
const mapStateToProps = (s: State, props: any) => ({
  show: showState(s)[props.params.id],
});
const mapDispatchToProps = {
  dispatch: showFatchAction,
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(memo(ShowDetail))
);
