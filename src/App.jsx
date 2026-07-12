import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import TrainingStudio from "./pages/TrainingStudio.jsx";
import ChoreographyStudio from "./pages/ChoreographyStudio.jsx";
import CommunityHub from "./pages/CommunityHub.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/training" element={<TrainingStudio />} />
      <Route path="/choreography" element={<ChoreographyStudio />} />
      <Route path="/community" element={<CommunityHub />} />
    </Routes>
  );
}