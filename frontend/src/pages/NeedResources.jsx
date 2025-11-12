import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Our new auth hook

export default function NeedResources() {
  const [resources, setResources] = useState([]); // This will hold the list of all available resources
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState({}); // Stores { resourceId: quantity }
  const { eventId } = useParams(); // Get eventId from URL (e.g., /resources/101)
  const { getToken } = useAuth();
  const navigate = useNavigate();

  // Fetch all available resources from the backend
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const token = getToken();
        // We need a new protected route to get all resources
        // (e.g., GET /api/admin/resources, which we will build)
        // For now, we'll mock the data:
        const mockResources = [
          { resourceId: 1, resourceName: 'Benches', category: 'Furniture' },
          { resourceId: 2, resourceName: 'Projector', category: 'AV' },
          { resourceId: 3, resourceName: 'WiFi Router', category: 'IT' },
          { resourceId: 4, resourceName: 'Microphone', category: 'AV' },
          { resourceId: 5, resourceName: 'Podium', category: 'Furniture' },
          { resourceId: 6, resourceName: 'Extension Cords', category: 'IT' },
        ];
        setResources(mockResources);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch resources');
        setLoading(false);
      }
    };
    fetchResources();
  }, [getToken]);

  const handleQuantityChange = (resourceId, quantity) => {
    const num = parseInt(quantity, 10);
    // This logic creates a "cart" of items
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (num > 0) {
        newCart[resourceId] = num; // Add/update the item
      } else {
        delete newCart[resourceId]; // Remove the item if quantity is 0 or less
      }
      return newCart;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Convert the 'cart' object into the array format our backend expects
    const items = Object.entries(cart).map(([resourceId, quantity]) => ({
      resourceId: parseInt(resourceId, 10),
      quantity,
    }));

    if (items.length === 0) {
      setError('Please select at least one resource.');
      setLoading(false);
      return;
    }

    try {
      const token = getToken();
      // This is our new, protected, and automated backend route
      const res = await fetch(`http://localhost:5000/api/requirements/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ items }), // Send the "shopping cart"
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to submit request');
      }

      alert('Resource request submitted successfully! All incharges have been notified.');
      setCart({}); // Clear the cart
      navigate(`/events/${eventId}`); // Go back to the event dashboard

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 p-8 text-white">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <h2 className="text-3xl font-bold text-center mb-6">Request Resources</h2>
        <p className="text-gray-300 text-center mb-6">
          Select the items and quantities you need for your event (Event ID: {eventId}). 
          The correct "Incharge" for each item will be notified automatically.
        </p>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4">{error}</div>}
        
        {loading ? (
          <div className="text-center text-xl">Loading available resources...</div>
        ) : (
          <div className="space-y-4">
            {resources.map(res => (
              <div 
                key={res.resourceId} 
                className="flex justify-between items-center bg-white/5 p-4 rounded-lg border border-white/10"
              >
                <div>
                  <div className="font-semibold text-lg">{res.resourceName}</div>
                  <div className="text-sm text-gray-400">{res.category}</div>
                </div>
                <input 
                  type="number"
                  min="0"
                  placeholder="0"
                  className="input-field w-24" // Using the style from index.css
                  value={cart[res.resourceId] || ''}
                  onChange={(e) => handleQuantityChange(res.resourceId, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading || Object.keys(cart).length === 0} 
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 transition-all"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}