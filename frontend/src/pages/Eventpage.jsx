import React, { useState } from 'react';

export default function Eventpage() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit",
      date: "2024-12-15",
      time: "6:00 PM",
      location: "Main Auditorium",
      type: "workshop",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
      attendees: 247,
      description: "Join us for an exciting evening of tech talks, demos, and networking with industry leaders.",
      price: "Free"
    },
    {
      id: 2,
      title: "Campus Cultural Night",
      date: "2024-12-18",
      time: "7:30 PM",
      location: "University Grounds",
      type: "social",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
      attendees: 512,
      description: "An evening of music, dance, and cultural performances from around the world.",
      price: "$10"
    },
    {
      id: 3,
      title: "Startup Career Fair",
      date: "2024-12-20",
      time: "10:00 AM",
      location: "Student Center",
      type: "career",
      image: "https://images.unsplash.com/photo-1551833997-05bac6e8c7b6?w=400",
      attendees: 189,
      description: "Connect with top startups and explore internship opportunities.",
      price: "Free"
    },
    {
      id: 4,
      title: "Hackathon 2024",
      date: "2024-12-22",
      time: "9:00 AM",
      location: "Tech Building",
      type: "workshop",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400",
      attendees: 156,
      description: "48-hour coding marathon with amazing prizes and mentorship.",
      price: "$5"
    },
    {
      id: 5,
      title: "Music Festival",
      date: "2024-12-25",
      time: "5:00 PM",
      location: "Sports Field",
      type: "social",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400",
      attendees: 1200,
      description: "Annual campus music festival featuring local bands and artists.",
      price: "$15"
    },
    {
      id: 6,
      title: "Alumni Networking",
      date: "2024-12-28",
      time: "4:00 PM",
      location: "Business Hall",
      type: "career",
      image: "https://images.unsplash.com/photo-1551833997-05bac6e8c7b6?w=400",
      attendees: 89,
      description: "Network with successful alumni and learn from their experiences.",
      price: "Free"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'social', label: 'Social' },
    { id: 'career', label: 'Career' }
  ];

  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.type === activeFilter);

  const getTypeColor = (type) => {
    const colors = {
      workshop: 'bg-purple-500',
      social: 'bg-pink-500',
      career: 'bg-blue-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 pt-32 pb-20 px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Campus <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Events</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover amazing events, connect with peers, and make your campus life unforgettable
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                {/* Event Image */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`${getTypeColor(event.type)} text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold backdrop-blur-sm">
                      {event.price}
                    </span>
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-purple-300 font-semibold">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <div className="flex items-center text-gray-400">
                      <span className="text-sm">👥 {event.attendees}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <span>🕒</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                      Register Now
                    </button>
                    <button className="w-12 h-12 border border-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white/10 transition-all duration-300">
                      ♡
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Create Event +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}