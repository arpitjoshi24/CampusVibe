import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Pevent() {
  const { state: event } = useLocation();
  const navigate = useNavigate();

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">
        No event details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-white bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 backdrop-blur-lg border border-white/10"
      >
         Back
      </button>

      {/* Event Container */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Banner */}
        <div className="h-72 w-full overflow-hidden">
          <img
            src={
              event.bannerUrl
                ? `http://localhost:5000${event.bannerUrl}`
                : "https://via.placeholder.com/800x400?text=No+Image"
            }
            alt={event.eventName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="p-10 text-white">
          <h1 className="text-4xl font-bold mb-4">{event.eventName}</h1>

          {/* Date + Venue */}
          <div className="flex flex-wrap gap-6 mb-6 text-gray-300">
            <p className="text-lg">
              📅{" "}
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <p className="text-lg">📍 {event.venue}</p>

            <p className="text-lg">🎯 Mode: {event.eventMode}</p>
          </div>

          {/* Organizer */}
          <p className="text-lg text-purple-300 mb-6">
            👤 Organizer: <span className="text-white">{event.organizer}</span>
          </p>

          {/* Description */}
          <h2 className="text-2xl font-semibold mb-2">About this Event</h2>
          <p className="text-gray-300 leading-relaxed mb-10">{event.eventDesc}</p>

          {/* Register CTA */}
          <div className="text-center">
           <button
  onClick={() => navigate("/register", { state: event })}
  className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-xl"
>
  Register Now
</button>

          </div>
        </div>
      </div>
    </div>
  );
}
