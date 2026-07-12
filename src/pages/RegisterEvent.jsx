import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterEvent() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const event = state?.event;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white text-xl">
        No event selected.
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`🎉 Successfully registered for ${event.title}!`);

    navigate("/events");
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white py-10 px-4">

      <div className="max-w-xl mx-auto bg-[#1E293B] rounded-2xl shadow-lg overflow-hidden">

        <img
          src={event.image}
          alt={event.title}
          className="w-full h-56 object-cover"
        />

        <div className="p-8">

          <h1 className="text-3xl font-bold">
            Register for Event
          </h1>

          <p className="text-cyan-400 mt-2">
            {event.title}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-8"
          >

            <input
              required
              placeholder="Full Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700"
            />

            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700"
            />

            <input
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700"
            />

            <input
              required
              placeholder="City"
              value={city}
              onChange={(e)=>setCity(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0B1120] border border-gray-700"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 font-semibold"
            >
              Confirm Registration
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}