import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Addevent from "./pages/Addevent";
import Eventpage from "./pages/Eventpage";
import Home from "./pages/Home";
import Pevent from "./pages/Pevent";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Eventpage />} />
        <Route path="/pevent" element={<Pevent />} />
        <Route path="/addevent" element={<Addevent />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
