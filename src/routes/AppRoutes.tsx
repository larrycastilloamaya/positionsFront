import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PositionListPage from "../features/positions/pages/PositionListPage";
import PositionDetailsPage from "../features/positions/pages/PositionDetailsPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PositionListPage />} />
        <Route path="/positions/:id" element={<PositionDetailsPage />} />
      </Routes>
    </Router>
  );
}