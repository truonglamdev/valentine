/*************  ✨ Codeium Command 🌟  *************/
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Valentine from "./pages/Valentine.jsx";
import Gift from "./pages/Gift.jsx";
import Animation from "./pages/Animation.jsx";
import Home from "./pages/Home.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/gift" element={<Gift />} />
        <Route path="/animation" element={<Animation />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

/******  0ec204ae-f4e5-4457-a304-e6eecc678a75  *******/
