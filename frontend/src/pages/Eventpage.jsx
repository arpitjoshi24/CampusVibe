import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Eventpage() {
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

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'Online', label: 'Online' },
    { id: 'Offline', label: 'Offline' },
    { id: 'Hybrid', label: 'Hybrid' },
  ];

  const filteredEvents =
    activeFilter === 'all'
      ? events
      : events.filter((event) => event.eventMode === activeFilter);

  const getTypeColor = (mode) => {
    const colors = {
      Online: 'bg-blue-500',
      Offline: 'bg-purple-500',
      Hybrid: 'bg-pink-500',
    };
    return colors[mode] || 'bg-gray-500';
  };

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

      {/* Filters */}
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
                <div
                  key={event.id}
                  className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
                >
                  {/* Event Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
  src={
    event.bannerUrl
      ? `http://localhost:5000${event.bannerUrl}`
      : 'https://via.placeholder.com/400x250?text=No+Image'
  }
  alt={event.eventName}
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
/>

                    <div className="absolute top-4 right-4">
                      <span
                        className={`${getTypeColor(
                          event.eventMode
                        )} text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm`}
                      >
                        {event.eventMode}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-purple-300 font-semibold">
                        {new Date(event.eventDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <div className="flex items-center text-gray-400">
                        <span className="text-sm">📍 {event.venue}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                      {event.eventName}
                    </h3>

                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {event.eventDesc}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">
                        👤 {event.organizer}
                      </span>
                      <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-white/10 backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-white mb-4">
              Can't Find Your Event?
            </h2>
            <p className="text-gray-300 text-xl mb-8">
              Create your own event and bring the campus together
            </p>
            <button
              onClick={() => navigate('/addevent')}
              className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Create Event +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
