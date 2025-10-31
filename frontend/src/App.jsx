import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Eventpage from "./pages/Eventpage";
import Pevent from "./pages/Pevent";
import Addevent from "./pages/Addevent";
import Register from "./pages/Register";
import Login from "./pages/Login"; // ✅ Add this import
import NeedResources from "./pages/NeedResources";

function App() {
  return (
    <Router>
      {/* Navbar stays visible on all pages */}
      <Navbar />

      {/* Main content area */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Eventpage />} />
          <Route path="/pevent" element={<Pevent />} />
          <Route path="/addevent" element={<Addevent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resources" element={<NeedResources/>} />
          <Route path="/signin" element={<Login />} /> {/* ✅ Added route */}
        </Routes>
      </main>

      {/* Footer stays visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;
