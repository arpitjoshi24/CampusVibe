import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Register() {
const { state: event } = useLocation();
const navigate = useNavigate();

const [form, setForm] = useState({
studentId: "",
name: "",
email: "",
phone: "",
department: "",
year: "",
});

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/registration/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        eventName: event?.eventName,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      alert("Registration Successful!");
      navigate("/");
    } else {
      alert("Something went wrong!");
    }
  } catch (error) {
    console.error(error);
    alert("Error connecting to server");
  }
};


return ( <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center p-6"> <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-3xl">


    {/* Title */}
    <h1 className="text-4xl font-bold text-white text-center mb-6">
      Event Registration
    </h1>
    <p className="text-center text-purple-300 mb-8 text-lg">
      Registering for: <span className="text-white">{event?.eventName}</span>
    </p>

    {/* Form */}
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="text-white font-medium">Student ID</label>
        <input
          type="text"
          name="studentId"
          required
          placeholder="Enter Student ID"
          className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-white font-medium">Full Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter Full Name"
          className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-white font-medium">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter Email"
          className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-white font-medium">Phone Number</label>
        <input
          type="text"
          name="phone"
          required
          placeholder="Enter Phone Number"
          className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-white font-medium">Department</label>
        <input
          type="text"
          name="department"
          required
          placeholder="CSE / IT / ECE / Mechanical ..."
          className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="text-white font-medium">Year</label>
        <select
          name="year"
          required
          className="w-full mt-2 p-3 rounded-xl bg-white/20 text-white outline-none"
          onChange={handleChange}
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
      </div>

      {/* Submit */}
      <div className="text-center">
        <button
          type="submit"
          className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-lg font-bold hover:scale-105 transition-all shadow-xl"
        >
          Submit Registration
        </button>
      </div>

    </form>

  </div>
</div>


);
}
