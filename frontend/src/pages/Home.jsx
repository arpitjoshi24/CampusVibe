import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real events from backend, replacing the hardcoded ones
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Fetch from the public 'GET /api/events' route
        const res = await fetch('http://localhost:5000/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        // Just show the first 3 upcoming events on the homepage
        setEvents(data.slice(0, 3)); 
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);
  
  // This is from your original file, we'll keep it
  const features = [
    {
      icon: "📅",
      title: "Events & Activities",
      description: "Discover campus events, parties, workshops, and social gatherings."
    },
    {
      icon: "👥",
      title: "Student Clubs",
      description: "Join student organizations, find like-minded peers, and build your campus network."
    },
    {
      icon: "🌐",
      title: "Campus Connect",
      description: "Stay updated with campus news, announcements, and connect with your community."
    }
  ];

  return (
    // We are keeping your exact layout and theme colors
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 px-8">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Campus<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vibe</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your gateway to campus life. Discover events, join clubs, and connect with your community.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {/* UPDATED: Buttons now use <Link> and point to the correct routes */}
            <Link 
              to="/events" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Events
            </Link>
            <Link 
              to="/request-event" 
              className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm"
            >
              Organize an Event
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section (Keeping your original 'Why Choose') */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CampusVibe</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events (Now Dynamic) */}
      <section className="py-16 px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Upcoming <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="col-span-3 text-center text-gray-400">Loading events...</p>
            ) : events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-400">No upcoming events found.</p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section (No changes needed) */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 border border-white/10 backdrop-blur-lg">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience Campus Life?
            </h2>
            <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of students already using CampusVibe to enhance their college experience.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/events" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper component for the event card
const EventCard = ({ event }) => (
  <div 
    className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
  >
    {/* UPDATED: Use bannerUrl from our new 'Event' model */}
    <img
      src={event.bannerUrl ? `http://localhost:5000${event.bannerUrl}` : 'https://images.unsplash.com/photo-1511578314322-379afb476865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNTU2MDB8MHwxfHNlYXJjaHw0fHxldmVudHxlbnwwfHx8fDE2OTg0MTc5NTJ8MA&ixlib.rb-4.0.3&q=80&w=1080'}
      alt={event.eventName}
      className="w-full h-48 object-cover"
    />
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        {/* UPDATED: Use 'registrationType' from our new 'Event' model */}
        <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {event.registrationType || 'Event'}
        </span>
        {/* UPDATED: Use 'startTime' from our new 'Event' model */}
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          {new Date(event.startTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
        {event.eventName}
      </h3>
      <div className="flex items-center justify-between text-gray-400 mb-6">
        <span>📍 {event.venue}</span>
        {/* UPDATED: Use 'isPaidEvent' from our new 'Event' model */}
        <span className={event.isPaidEvent ? "text-green-400" : ""}>
          {event.isPaidEvent ? 'Paid' : 'Free'}
        </span>
      </div>
      {/* UPDATED: This now links to the new 'EventDashboard' page */}
      <Link 
        to={`/events/${event.id}`} 
        className="w-full text-center block bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
      >
        Learn More
      </Link>
    </div>
  </div>
);