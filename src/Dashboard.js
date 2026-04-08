import React, { useState } from "react";

function Dashboard() {
  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("bookings")) || []
  );

  // ❌ CANCEL BOOKING
  const handleCancel = (index) => {
    const updated = bookings.filter((_, i) => i !== index);

    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
        My Bookings 📊
      </h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No bookings yet 🚫
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {bookings.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-5 hover:scale-105 transition"
            >

              {/* IMAGE */}
              {b.image && (
                <img
                  src={b.image}
                  alt={b.name}
                  className="h-40 w-full object-cover rounded"
                />
              )}

              {/* DETAILS */}
              <h2 className="text-xl font-bold mt-3">{b.name}</h2>

              <p className="text-gray-600">🎉 {b.eventName}</p>
              <p className="text-gray-600">📅 {b.date}</p>
              <p className="text-gray-600">⏰ {b.time}</p>
              <p className="text-gray-600">👥 {b.people} Guests</p>
              <p className="text-gray-600">📞 {b.contact}</p>

              {/* ✅ CONTACT FIX */}
              <p className="text-gray-600">📞 {b.contact}</p>

              {/* STATUS */}
              <span className="inline-block bg-green-100 text-green-600 px-2 py-1 mt-2 rounded text-sm">
                Confirmed
              </span>

              {/* CANCEL BUTTON */}
              <button
                onClick={() => handleCancel(i)}
                className="bg-red-500 text-white w-full mt-3 p-2 rounded hover:bg-red-600"
              >
                Cancel Booking
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Dashboard;