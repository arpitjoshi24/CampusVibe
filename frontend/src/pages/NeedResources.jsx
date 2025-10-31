import React, { useState } from 'react';

export default function NeedResources() {
  const [formData, setFormData] = useState({
    department: '',
    eventName: '',
    coordinatorName: '',
    coordinatorEmail: '',
    coordinatorPhone: '',
    consultEmail: '', // 🆕 recipient
    authorizedHeadEmail: '', // 🆕 CC email
    requirements: {
      electricity: false,
      soundSystem: false,
      projector: false,
      tables: false,
      chairs: false,
      wifi: false,
      others: '',
    },
    eventDate: '',
    message: '',
  });

  // ✅ Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle checkboxes
  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, [name]: checked },
    });
  };

  // ✅ Handle "other requirements"
  const handleOtherChange = (e) => {
    setFormData({
      ...formData,
      requirements: { ...formData.requirements, others: e.target.value },
    });
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/requirements/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Requirement submitted & email sent!');
        setFormData({
          department: '',
          eventName: '',
          coordinatorName: '',
          coordinatorEmail: '',
          coordinatorPhone: '',
          consultEmail: '',
          authorizedHeadEmail: '',
          requirements: {
            electricity: false,
            soundSystem: false,
            projector: false,
            tables: false,
            chairs: false,
            wifi: false,
            others: '',
          },
          eventDate: '',
          message: '',
        });
      } else {
        alert(data.message || 'Error submitting requirement.');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Server error.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#111827] to-[#1f2937] text-white flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-8 w-full max-w-3xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Event Resource Requirement
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <input
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            placeholder="Event Name"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <input
            name="coordinatorName"
            value={formData.coordinatorName}
            onChange={handleChange}
            placeholder="Coordinator Name"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <input
            type="email"
            name="coordinatorEmail"
            value={formData.coordinatorEmail}
            onChange={handleChange}
            placeholder="Coordinator Email"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <input
            type="tel"
            name="coordinatorPhone"
            value={formData.coordinatorPhone}
            onChange={handleChange}
            placeholder="Coordinator Phone"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
        </div>

        {/* 🆕 Email fields */}
        <h3 className="text-xl mt-8 mb-3 font-semibold">Email Notification</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="email"
            name="consultEmail"
            value={formData.consultEmail}
            onChange={handleChange}
            placeholder="Consultant Email (Recipient)"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
          <input
            type="email"
            name="authorizedHeadEmail"
            value={formData.authorizedHeadEmail}
            onChange={handleChange}
            placeholder="Authorized Head Email (CC)"
            className="p-3 rounded-lg bg-white/5 border border-white/10"
          />
        </div>

        <h3 className="text-xl mt-6 mb-3 font-semibold">Required Resources</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['electricity', 'soundSystem', 'projector', 'tables', 'chairs', 'wifi'].map(
            (item) => (
              <label key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={item}
                  checked={formData.requirements[item]}
                  onChange={handleCheckbox}
                />
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </label>
            )
          )}
        </div>

        <textarea
          name="others"
          value={formData.requirements.others}
          onChange={handleOtherChange}
          placeholder="Other requirements..."
          className="w-full mt-4 p-3 rounded-lg bg-white/5 border border-white/10"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Additional message to admin..."
          className="w-full mt-4 p-3 rounded-lg bg-white/5 border border-white/10"
        />

        <button
          type="submit"
          className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          Submit Requirement
        </button>
      </form>
    </div>
  );
}
