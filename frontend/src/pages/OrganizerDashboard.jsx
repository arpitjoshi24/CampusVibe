import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function OrganizerDashboard() {
  const [myEvents, setMyEvents] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]); // For Main Organizers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, getToken } = useAuth();
  const navigate = useNavigate();

  // We need to fetch data from two separate protected routes
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = getToken();
      if (!token) {
        navigate('/signin');
        return;
      }
      
      const headers = { 'Authorization': `Bearer ${token}` };

      // 1. Fetch the user's own events
      //    (We must create this route: GET /api/organizer/my-events)
      const eventsRes = await fetch('http://localhost:5000/api/organizer/my-events', { headers });
      
      // 2. Fetch pending sub-event requests (for Main Organizers)
      const requestsRes = await fetch('http://localhost:5000/api/organizer/requests/pending', { headers });

      if (!eventsRes.ok || !requestsRes.ok) {
        throw new Error('Failed to fetch dashboard data.');
      }
      
      const eventsData = await eventsRes.json();
      const requestsData = await requestsRes.json();
      
      setMyEvents(eventsData);
      setPendingRequests(requestsData);

    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [getToken, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Run on mount

  // --- Handlers for Sub-Event Approval ---
  
  const handleRequestApproval = async (requestId, isApproved) => {
    const action = isApproved ? 'approve' : 'reject';
    if (action === 'reject' && !window.confirm('Are you sure you want to reject this sub-event request?')) {
      return;
    }

    try {
      const token = getToken();
      // This calls the routes we defined in `organizerRoutes.js`
      const res = await fetch(`http://localhost:5000/api/organizer/requests/${requestId}/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || `Failed to ${action} request`);
      }

      alert(`Request successfully ${action}d.`);
      fetchData(); // Refresh the entire dashboard
      
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-8 text-white">
        <h2 className="text-2xl">Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          {/* This button respects the 'eventCreationLimit' from our backend */}
          <Link 
            to="/addevent" 
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            + Create New Event
          </Link>
        </div>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4">{error}</div>}

        {/* --- Section for Approving Sub-Events (for Main Organizers) --- */}
        {pendingRequests.length > 0 && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Pending Sub-Event Requests</h2>
            <div className="space-y-4">
              {pendingRequests.map(req => (
                <div key={req.id} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-white/10">
                  <div className="mb-4 md:mb-0">
                    <div className="font-semibold text-lg">{req.requestorEmail}</div>
                    <p className="text-sm text-gray-300 mt-1">Details: {req.eventDetails || 'N/A'}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button 
                      onClick={() => handleRequestApproval(req.id, true)} 
                      className="admin-button-green"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleRequestApproval(req.id, false)} 
                      className="admin-button-red"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Section for Managing "My Events" --- */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-2xl font-semibold mb-4">My Events</h2>
          <div className="space-y-4">
            {!loading && myEvents.length === 0 ? (
              <p className="text-gray-400">You have not created any events yet. Click "Create New Event" to get started.</p>
            ) : (
              myEvents.map(event => (
                <div key={event.id} className="bg-white/5 p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center border border-white/10">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-xl text-purple-300">{event.eventName}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(event.startTime).toLocaleDateString()} | {event.venue}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link 
                      to={`/events/${event.id}`} 
                      className="admin-button"
                    >
                      Manage
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}