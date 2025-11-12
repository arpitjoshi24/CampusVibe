import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Our new auth hook
import NotFound from './NotFound'; // We'll need this if the event isn't found

export default function EventDashboard() {
  const [event, setEvent] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get the event ID from the URL
  const { user, getToken } = useAuth();
  const navigate = useNavigate();

  // Fetch event details from the backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        // Call our public GET /api/events/:id route
        const res = await fetch(`http://localhost:5000/api/events/${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Event not found');
        }
        const data = await res.json();
        setEvent(data);

        // If the event has a leaderboard, fetch its data
        if (data.hasLeaderboard) {
          // TODO: We need to create this public GET /api/events/:id/leaderboard route
          // For now, we'll mock it
          setLeaderboard([
            { rank: 1, competitorId: 'Team A', marks: 950 },
            { rank: 2, competitorId: 'Team B', marks: 920 },
          ]);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  // --- Role-Based Access ---
  // Check if the logged-in user is the owner of this event or an Admin
  // We must check if 'event' and 'event.Organizer' exist first
  const isOwner = user && event && event.Organizer && 
                  (user.role === 'Admin' || user.email === event.Organizer.email);

  // --- Event Deletion (Rare Scenario) ---
  const handleDeleteEvent = async () => {
    if (!window.confirm("Are you sure you want to delete this event? This will delete all associated teams, participants, and leaderboard data. This action cannot be undone.")) {
      return;
    }
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete event');
      }
      alert('Event deleted successfully. All associated data has been purged.');
      navigate('/events'); // Go back to the event list
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // --- Main Render ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-8 text-white">
        <h2 className="text-2xl">Loading Event...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-8 text-white">
        <h2 className="text-2xl text-red-400">{error}</h2>
      </div>
    );
  }
  
  // If the event wasn't found, show the NotFound page
  if (!event) {
    return <NotFound />; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Event Header */}
        <div className="relative mb-8 p-8 md:p-12 rounded-3xl overflow-hidden border border-white/10 bg-black/20">
          <img 
            src={event.bannerUrl ? `http://localhost:5000${event.bannerUrl}` : 'https://images.unsplash.com/photo-1511578314322-379afb476865'}
            alt="Event Banner"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-30 blur-sm"
          />
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{event.eventName}</h1>
            <p className="text-xl text-gray-300 max-w-3xl">{event.eventDesc}</p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link to={`/events/${id}/register`} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition-transform">
                Register Now
              </Link>
              <Link to="/events" className="bg-white/10 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
                Explore More Events
              </Link>
            </div>
          </div>
        </div>
        
        {/* --- Organizer/Admin ONLY Control Panel --- */}
        {isOwner && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-purple-300">Organizer Admin Panel</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Link to={`/resources/${id}`} className="admin-button">Request Resources</Link>
              <button className="admin-button">Verify Payments</button>
              <button className="admin-button">Manage Team</button>
              <button className="admin-button">Manage Leaderboard</button>
              <button className="admin-button">Send Attendance</button>
              <button onClick={handleDeleteEvent} className="admin-button bg-red-800/50 text-red-300 hover:bg-red-800/70">Delete Event</button>
            </div>
          </div>
        )}

        {/* --- Public Details Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4">Event Details</h3>
              <div className="space-y-3 text-gray-300">
                <p><strong>Date:</strong> {new Date(event.startTime).toLocaleString()} to {new Date(event.endTime).toLocaleString()}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Type:</strong> {event.registrationType} ({event.isPaidEvent ? 'Paid' : 'Free'})</p>
                <p><strong>Organizing Club:</strong> {event.Club ? event.Club.clubName : 'N/A'}</p>
              </div>
            </div>

            {/* Leaderboard (Public) */}
            {event.hasLeaderboard && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <h3 className="text-2xl font-semibold mb-4">Leaderboard</h3>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3">Rank</th>
                      <th className="p-3">Team / Participant</th>
                      {event.showLeaderboardMarks && <th className="p-3 text-right">Marks</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((item) => (
                      <tr key={item.rank} className="border-b border-white/5">
                        <td className="p-3 text-2xl font-bold text-purple-300">{item.rank}</td>
                        <td className="p-3 text-lg">{item.competitorId}</td>
                        {event.showLeaderboardMarks && <td className="p-3 text-right text-lg">{item.marks}</td>}
                      </tr>
                    ))}
                    {leaderboard.length === 0 && (
                      <tr>
                        <td colSpan={event.showLeaderboardMarks ? 3 : 2} className="p-3 text-center text-gray-400">
                          Leaderboard data will be published by the organizer.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Sidebar (Right Column) */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="text-2xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">For any queries, please contact:</p>
              <a href={`mailto:${event.contactDetails?.email}`} className="text-purple-400 text-lg hover:underline">
                {event.contactDetails?.email || 'No contact provided'}
              </a>
            </div>
            
            {/* Add more sidebar widgets here if needed (e.g., Total Registrations) */}
            
          </div>
        </div>
      </div>
    </div>
  );
}