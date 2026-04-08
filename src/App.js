import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./Dashboard";
import CreateEvent from "./CreateEvent";
import VendorDetails from "./VendorDetails";
import EventSummary from "./EventSummary";
import Login from "./Login";
import VendorDashboard from "./VendorDashboard";
import Footer from "./Footer";
import Payment from "./Payment";
import AdminPanel from "./AdminPanel";

const staticVendors = [
  {
    name: "DJ Rahul",
    service: "DJ",
    price: 10000,
    contact: "9876543210",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  }
];

function App() {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [vendors, setVendors] = useState([]);
  const [, setUser] = useState(null);

  useEffect(() => {
    const load = () => {
      const data = JSON.parse(localStorage.getItem("vendors")) || [];
      setVendors([...staticVendors, ...data]);
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) setUser(savedUser);
    };

    load();
    window.addEventListener("storage", load);
    window.addEventListener("focus", load);

    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("focus", load);
    };
  }, []);

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

  const filtered = vendors.filter((v) => {
    return (
      v.name?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || v.service === category)
    );
  });

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div className="flex justify-between p-4 bg-white shadow">
                <h1 className="text-xl font-bold text-purple-600">Event Planner</h1>
                <div className="flex gap-4">
                  <Link to="/">Home</Link>
                  <Link to="/client">Dashboard</Link>
                  <Link to="/login">Login</Link>
                </div>
              </div>

              <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622')] bg-cover flex items-center justify-center text-white">
                <input
                  placeholder="Search..."
                  className="p-3 w-[50%] text-black"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex gap-4 justify-center p-6">
                <button onClick={() => setCategory("DJ")}>DJ</button>
                <button onClick={() => setCategory("Catering")}>Catering</button>
                <button onClick={() => setCategory("Venue")}>Venue</button>
                <button onClick={() => setCategory("")}>All</button>
              </div>

              <div className="p-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {filtered.map((v, i) => {
                  const vendorReviews = reviews.filter((r) => r.vendorName === v.name);
                  const avgRating =
                    vendorReviews.length > 0
                      ? (vendorReviews.reduce((a, b) => a + Number(b.rating), 0) / vendorReviews.length).toFixed(1)
                      : "No Rating";

                  return (
                    <div key={i} className="bg-white shadow p-4 rounded hover:scale-105 transition">
                      <img src={v.image} alt={v.name} className="h-40 w-full object-cover" />
                      <h3 className="font-bold mt-2">{v.name}</h3>
                      <p>{v.service}</p>
                      <p>₹{v.price}</p>
                      <p>⭐ {avgRating}</p>
                      <Link to={`/details/${i}`}>
                        <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded">View Details</button>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/client" element={<Dashboard />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/details/:id" element={<VendorDetails />} />
        <Route path="/summary" element={<EventSummary />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
