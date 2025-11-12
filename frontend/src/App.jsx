import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider"; // We import the new Provider
import ProtectedRoute from "./components/ProtectedRoute"; // We import our new gatekeeper
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// --- Import All Pages ---
// Existing Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Addevent from "./pages/Addevent";
import NeedResources from "./pages/NeedResources";
// This is your old 'Eventpage.jsx', which we'll rename to 'EventListPage.jsx'
import EventListPage from "./pages/EventListPage"; 

// New Pages (We will create these files one by one)
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import ChangePassword from "./pages/ChangePassword";
import EventDetails from "./pages/EventDetails";
import RegisterForEvent from "./pages/RegisterForEvent";
import ClubDashboard from "./pages/ClubDashboard";
import ClubDetails from "./pages/ClubDetails";
import EventRequestForm from "./pages/EventRequestForm";
import NotFound from "./pages/NotFound";

/**
 * This is the main App component.
 * It wraps the entire application in the AuthProvider and Router.
 */
function App() {
  // Define roles for clarity in our routes
  const ORGANIZER_ROLES = ['Admin', 'Organizer', 'SubOrganizer'];
  const ADMIN_ONLY = ['Admin'];

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen"> {/* This maintains your original layout */}
          <Routes>
            {/* --- Public Routes (Public Lane) --- */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/events" element={<EventListPage />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/events/:id/register" element={<RegisterForEvent />} />
            <Route path="/clubs" element={<ClubDashboard />} />
            <Route path="/clubs/:id" element={<ClubDetails />} />
            <Route path="/request-event" element={<EventRequestForm />} />

            {/* --- Protected Routes (Admin & Organizer Lanes) --- */}
            
            {/* Must be logged in (any role) */}
            <Route 
              path="/change-password" 
              element={<ProtectedRoute element={<ChangePassword />} />} 
            />

            {/* Must be 'Admin' */}
            <Route 
              path="/admin/dashboard" 
              element={<ProtectedRoute element={<AdminDashboard />} requiredRole={ADMIN_ONLY} />} 
            />
            
            {/* Must be 'Organizer', 'SubOrganizer', or 'Admin' */}
            <Route 
              path="/organizer/dashboard" 
              element={<ProtectedRoute element={<OrganizerDashboard />} requiredRole={ORGANIZER_ROLES} />} 
            />
            <Route 
              path="/addevent" 
              element={<ProtectedRoute element={<Addevent />} requiredRole={ORGANIZER_ROLES} />} 
            />
            {/* This route is now dynamic to pass the event ID */}
            <Route 
              path="/resources/:eventId" 
              element={<ProtectedRoute element={<NeedResources />} requiredRole={ORGANIZER_ROLES} />} 
            />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
            
            {/* --- Original Obsolete Routes (we are no longer using) --- */}
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/pevent" element={<Pevent />} /> */}
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;