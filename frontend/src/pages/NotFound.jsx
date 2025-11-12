import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center text-center p-8 text-white">
      <div>
        <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-4xl font-semibold mt-4 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-300 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link 
          to="/" 
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}