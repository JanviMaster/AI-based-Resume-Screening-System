import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import UploadJD from "./pages/UploadJD";
import Candidates from "./pages/Candidates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload-resume" element={<UploadResume />} />
        <Route path="/upload-jd" element={<UploadJD />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </Router>
  );
}

export default App;