import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    location: "",
    guests: "",
    services: []
  });

  const prices = {
    DJ: 10000,
    Catering: 15000,
    Decoration: 8000
  };

  const total = event.services.reduce((sum, s) => sum + prices[s], 0);

  const handleService = (service) => {
    let updated = [...event.services];

    if (updated.includes(service)) {
      updated = updated.filter((s) => s !== service);
    } else {
      updated.push(service);
    }

    setEvent({ ...event, services: updated });
  };

  const handleSubmit = () => {
    if (!event.name || !event.date || !event.location) {
      alert("Fill all fields");
      return;
    }

    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));

    localStorage.setItem("lastEvent", JSON.stringify(event));

    alert("Event Created 🎉");

    navigate("/summary"); // 🔥 IMPORTANT
  };

  return (
    <div className="p-10">

      <h2>Create Event</h2>

      <input placeholder="Name"
        onChange={(e)=>setEvent({...event,name:e.target.value})} />

      <input type="date"
        onChange={(e)=>setEvent({...event,date:e.target.value})} />

      <input placeholder="Location"
        onChange={(e)=>setEvent({...event,location:e.target.value})} />

      <input placeholder="Guests"
        onChange={(e)=>setEvent({...event,guests:e.target.value})} />

      <h3>Services</h3>

      <button onClick={()=>handleService("DJ")}>DJ</button>
      <button onClick={()=>handleService("Catering")}>Catering</button>
      <button onClick={()=>handleService("Decoration")}>Decoration</button>

      <p>Total: ₹{total}</p>

      <button onClick={handleSubmit}>
        Create Event
      </button>

    </div>
  );
}

export default CreateEvent;