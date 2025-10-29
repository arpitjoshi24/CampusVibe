import React from 'react';

export default function Home() {
  const events = [
    {
      title: "Tech Fest 2024",
      date: "Dec 15",
      location: "Main Auditorium",
      type: "Workshop",
      attendees: 247
    },
    {
      title: "Cultural Night",
      date: "Dec 18",
      location: "University Grounds",
      type: "Social",
      attendees: 512
    },
    {
      title: "Career Fair",
      date: "Dec 20",
      location: "Student Center",
      type: "Career",
      attendees: 189
    }
  ];

  const features = [
    {
      icon: "🎉",
      title: "Events & Activities",
      description: "Discover campus events, parties, workshops, and social gatherings happening around you."
    },
    {
      icon: "👥",
      title: "Student Clubs",
      description: "Join student organizations, find like-minded peers, and build your campus network."
    },
    {
      icon: "📱",
      title: "Campus Connect",
      description: "Stay updated with campus news, announcements, and connect with your community."
    }
  ];

  const getTypeColor = (type) => {
    const colors = {
      Workshop: 'bg-purple-500',
      Social: 'bg-pink-500',
      Career: 'bg-blue-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore Events
            </button>
            <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm">
              Join Campus
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Upcoming Events */}
      <section className="py-16 px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Upcoming <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <div 
                key={index}
                className="group bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`${getTypeColor(event.type)} text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm`}>
                      {event.type}
                    </span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white py-3 rounded-xl font-semibold hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 border border-white/10 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Get Started
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}