import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from "./pages/uploadpage";
import MapPage from "./pages/MapPage";
import AboutPage from "./pages/AboutPage";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Add more routes here if any */}
      </Routes>
    </Router>
  );
}

export default App;
