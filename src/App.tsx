import ShowListPage from "./Component/ShowListPage";
import { Routes, Route } from "react-router-dom";
import ShowDetail from "./Component/ShowDetail";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<ShowListPage />} />
        <Route path="/shows/:id" element={<ShowDetail />} />
      </Routes>
    </div>
  );
}
export default App;
