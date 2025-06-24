import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PositionListPage from "../features/positions/pages/PositionListPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PositionListPage />} />
      </Routes>
    </Router>
  );
}