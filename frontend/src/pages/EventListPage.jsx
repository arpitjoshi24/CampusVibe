import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EventListPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // This is our public API route for all events
        const res = await fetch('http://localhost:5000/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // NEW: Updated filters to match our new database schema
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'Paid', label: 'Paid' },
    { id: 'Free', label: 'Free' },
    { id: 'Team', label: 'Team' },
    { id: 'Individual', label: 'Individual' },
  ];

  // NEW: Updated filter logic
  const filteredEvents = events.filter(event => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'Paid') return event.isPaidEvent;
    if (activeFilter === 'Free') return !event.isPaidEvent;
    if (activeFilter === 'Team') return event.registrationType === 'Team';
    if (activeFilter === 'Individual') return event.registrationType === 'Individual';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-2xl">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400 text-xl">
        {error}
      </div>
    );
  }

  return (
    // Re-using your exact theme and layout from Eventpage.jsx
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 pt-32 pb-20 px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Campus{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing events, connect with peers, and make your campus
            life unforgettable
          </p>
        </div>
      </div>

      {/* Filters (Using new filter array) */}
      <div className="px-8 -mt-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-1 border border-white/20">
            <div className="flex flex-wrap gap-1">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex-1 min-w-[120px] px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="px-8 py-16">
        <div className="max-w-7xl mx-auto">
          {filteredEvents.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No events found for this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section (Updated to link to /request-event) */}
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-white/10 backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
              Want to Host Your Own Event?
            </h2>
            <p className="text-gray-300 text-xl mb-8">
              Submit a request to organize an event and bring the campus together.
            </p>
            <button
              onClick={() => navigate('/request-event')}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Request to Organize +
            </button>
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
      <div className="flex justify-between items-start mb-4">
        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.registrationType}
        </span>
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {new Date(event.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
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