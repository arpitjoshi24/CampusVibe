import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import NotFound from './NotFound'; // We'll need this if the club isn't found

export default function ClubDashboard() {
  const [club, setClub] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get the club ID from the URL

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        setLoading(true);
        // This calls our GET /api/clubs/:id route
        const res = await fetch(`http://localhost:5000/api/clubs/${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Could not fetch club details.');
        }
        const data = await res.json();
        setClub(data.club);
        setEvents(data.events);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClubDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-8 text-white">
        <h2 className="text-2xl">Loading Club...</h2>
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

  // If the club wasn't found, show the NotFound page
  if (!club) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Club Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {/* Mock Logo */}
          <div className="w-40 h-40 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
            <span className="text-5xl">🏛️</span>
          </div>
          <div>
            <h1 className="text-6xl font-bold">{club.clubName}</h1>
            <p className="text-xl text-gray-300 mt-2">{club.clubDescription}</p>
          </div>
        </div>

        {/* Events Associated with this Club */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-3xl font-semibold mb-6">Events by {club.clubName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map(event => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="text-gray-400 col-span-3">No upcoming events found for this club.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for the event card (same as on homepage)
const EventCard = ({ event }) => (
  <div 
    className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
  >
    <img
      src={event.bannerUrl ? `http://localhost:5000${event.bannerUrl}` : 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU2MDB8MHwxfHNlYXJjaHw0fHxldmVudHxlbnwwfHx8fDE2OTg0MTc5NTJ8MA&ixlib.rb-4.0.3&q=80&w=1080'}
      alt={event.eventName}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {event.eventName}
      </h3>
      <div className="flex items-center justify-between text-gray-400 mb-6">
        <span>📍 {event.venue}</span>
        <span className={event.isPaidEvent ? "text-green-400" : ""}>
          {event.isPaidEvent ? 'Paid' : 'Free'}
        </span>
      </div>
      <Link 
        to={`/events/${event.id}`} 
        className="w-full text-center block bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
      >
        Learn More
      </Link>
    </div>
  </div>
);