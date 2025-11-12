import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function RegisterForEvent() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  // This state will hold all the form data
  const [formData, setFormData] = useState({});
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);

  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // 1. Fetch the event's rules (schema, payment info, etc.)
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Event not found');
        }
        const data = await res.json();
        setEvent(data);
        // (In a real app, we'd parse data.registrationSchema here to build the form)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPaymentScreenshot(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // 1. We must use FormData because we are uploading a file
      const data = new FormData();

      // 2. Append all simple form data
      // (This assumes fields like 'studentId', 'teamName', etc.)
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      // 3. Append the payment screenshot file
      if (event.isPaidEvent && paymentScreenshot) {
        data.append('paymentScreenshot', paymentScreenshot);
      } else if (event.isPaidEvent && !paymentScreenshot) {
        throw new Error('Payment screenshot is required for this event.');
      }
      
      // 4. Submit to our new registration route
      const res = await fetch(`http://localhost:5000/api/register/${eventId}/register`, {
        method: 'POST',
        body: data,
        // No 'Content-Type' header, browser sets it for FormData
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Registration failed');
      }

      const result = await res.json();
      
      // 5. Show the correct success message
      if (result.data.paymentStatus === 'Pending') {
        alert('Registration Received! Your registration is pending payment verification by the organizer.');
      } else {
        alert('Registration Successful! See you at the event.');
      }
      navigate(`/events/${eventId}`); // Go back to the event dashboard

    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex-center p-8 text-white"><h2 className="text-2xl">Loading Registration Form...</h2></div>;
  }

  if (error) {
    return <div className="min-h-screen bg-slate-900 flex-center p-8 text-white"><h2 className="text-2xl text-red-400">{error}</h2></div>;
  }

  if (!event) {
    return <div className="min-h-screen bg-slate-900 flex-center p-8 text-white"><h2 className="text-2xl">Event not found.</h2></div>;
  }
  
  // This is a placeholder form. A real implementation would loop
  // over 'event.registrationSchema' to build the form dynamically.
  const renderFormFields = () => {
    if (event.registrationType === 'Team') {
      return (
        <>
          <input name="teamName" onChange={handleChange} placeholder="Team Name" className="input-field" required />
          <input name="teamLeaderStudentId" onChange={handleChange} placeholder="Your Student ID (Team Leader)" className="input-field" required />
          <textarea name="teamMemberStudentIds" onChange={handleChange} placeholder="Team Member Student IDs (comma-separated)" className="input-field" />
        </>
      );
    } else {
      return (
        <input name="studentId" onChange={handleChange} placeholder="Your Student ID" className="input-field" required />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center p-4 text-white">
      <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Register for {event.eventName}</h2>
        <p className="text-gray-300 text-center mb-6">
          {event.registrationType} Registration | {event.isPaidEvent ? 'Paid Event' : 'Free Event'}
        </p>
        
        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded-xl mb-4">{error}</div>}
        
        <div className="space-y-4">
          
          {/* This will be replaced by the dynamic form builder */}
          {renderFormFields()}
          
          {/* Payment Section (Conditional) */}
          {event.isPaidEvent && (
            <div className="bg-white/10 p-4 rounded-lg border border-white/20">
              <h4 className="text-xl font-semibold mb-2">Payment Required</h4>
              <p className="text-gray-300 mb-4">Please pay the event fee to one of the QR codes below. Upload your payment screenshot and transaction ID to complete registration.</p>
              
              {/* Display QR Codes */}
              <div className="flex gap-4 mb-4">
                {event.paymentQRCodes.map((qrUrl, index) => (
                  <img 
                    key={index} 
                    src={`http://localhost:5000${qrUrl}`} 
                    alt="Payment QR Code" 
                    className="w-32 h-32 rounded-lg" 
                  />
                ))}
              </div>
              
              <input name="transactionId" onChange={handleChange} placeholder="Transaction ID" className="input-field" required />
              <div className="mt-4">
                <label className="block text-gray-300 font-medium mb-2">Upload Payment Screenshot</label>
                <input 
                  type="file" 
                  name="paymentScreenshot" 
                  onChange={handleFileChange} 
                  className="input-file" 
                  accept="image/*" 
                  required 
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            disabled={submitting} 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </form>
    </div>
  );
}