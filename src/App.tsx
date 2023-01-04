import { useEffect, useState } from "react";
import { getShow, getShows } from "./Component/api";
import ShowListPage from "./Component/ShowListPage";
import { Routes, Route } from "react-router-dom";
import ShowDetail from "./Component/ShowDetail";
import { useSelector } from "react-redux";

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
