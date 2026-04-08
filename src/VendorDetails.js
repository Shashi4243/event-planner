import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const [form, setForm] = useState({
    eventName: "",
    clientName: "",
    contact: "",
    date: "",
    time: "",
    people: ""
  });

  const staticVendors = [
    {
      name: "DJ Rahul",
      service: "DJ",
      price: 10000,
      contact: "9876543210",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
    }
  ];

  const dynamic = JSON.parse(localStorage.getItem("vendors")) || [];
  const vendors = [...staticVendors, ...dynamic];

  const vendor = vendors[id];

  if (!vendor) return <h2>Vendor Not Found ❌</h2>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooking = () => {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    const booking = { ...vendor, ...form };
    bookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Save a simplified lastEvent for the summary page
    const lastEvent = {
      name: form.eventName || vendor.name,
      date: form.date || "",
      location: vendor.name || "",
      guests: form.people || "",
      services: [vendor.service || ""],
    };

    localStorage.setItem("lastEvent", JSON.stringify(lastEvent));

    navigate("/payment");
  };

  const handleReview = () => {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({
      vendorName: vendor.name,
      review,
      rating
    });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    alert("Review Added ⭐");
  };

  return (
    <div className="p-10 flex justify-center">

      <div className="bg-white p-6 shadow rounded w-[400px]">

        <img src={vendor.image} alt={`${vendor.name} service`} className="h-52 w-full object-cover" />

        <h2 className="text-xl font-bold mt-2">{vendor.name}</h2>

        <p>{vendor.service}</p>
        <p>₹{vendor.price}</p>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white w-full p-2 mt-3 rounded"
        >
          Book Now
        </button>

        {showForm && (
          <div className="mt-4">

            <input name="eventName" placeholder="Event Name" className="w-full border p-2 mb-2" onChange={handleChange} />
            <input name="clientName" placeholder="Client Name" className="w-full border p-2 mb-2" onChange={handleChange} />
            <input name="contact" placeholder="Mobile Number" className="w-full border p-2 mb-2" onChange={handleChange} />
            <input type="date" name="date" className="w-full border p-2 mb-2" onChange={handleChange} />
            <input type="time" name="time" className="w-full border p-2 mb-2" onChange={handleChange} />
            <input name="people" placeholder="No. of People" className="w-full border p-2 mb-2" onChange={handleChange} />

            <button onClick={handleBooking} className="bg-blue-500 text-white w-full p-2">
              Confirm Booking
            </button>

          </div>
        )}

        {/* REVIEW */}
        <div className="mt-6">

          <h3 className="font-bold">Add Review ⭐</h3>

          <input
            placeholder="Rating (1-5)"
            className="w-full border p-2 mb-2"
            onChange={(e) => setRating(e.target.value)}
          />

          <input
            placeholder="Write review"
            className="w-full border p-2 mb-2"
            onChange={(e) => setReview(e.target.value)}
          />

          <button onClick={handleReview} className="bg-purple-500 text-white w-full p-2">
            Submit Review
          </button>

        </div>

      </div>

    </div>
  );
}

export default VendorDetails;