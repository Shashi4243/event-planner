import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const loadData = () => {
      const b = JSON.parse(localStorage.getItem("bookings")) || [];
      const v = JSON.parse(localStorage.getItem("vendors")) || [];
      setBookings(b);
      setVendors(v);
    };
    loadData();
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, []);

  const handleDeleteBooking = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    localStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  const handleDeleteVendor = (index) => {
    const updated = vendors.filter((_, i) => i !== index);
    localStorage.setItem("vendors", JSON.stringify(updated));
    setVendors(updated);
  };

  const totalRevenue = bookings.length * 1500;
  const totalBookings = bookings.length;
  const totalVendors = vendors.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="p-6 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <button onClick={() => navigate("/")} className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600">
            Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-indigo-600/20 border border-indigo-500/50 rounded-xl p-6">
            <p className="text-indigo-200 text-sm">Total Bookings</p>
            <p className="text-4xl font-bold mt-2">{totalBookings}</p>
          </div>
          <div className="bg-green-600/20 border border-green-500/50 rounded-xl p-6">
            <p className="text-green-200 text-sm">Total Revenue</p>
            <p className="text-4xl font-bold mt-2">₹{totalRevenue.toLocaleString()}</p>
          </div>
          <div className="bg-purple-600/20 border border-purple-500/50 rounded-xl p-6">
            <p className="text-purple-200 text-sm">Total Vendors</p>
            <p className="text-4xl font-bold mt-2">{totalVendors}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === "bookings" ? "bg-indigo-600" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            Bookings ({totalBookings})
          </button>
          <button
            onClick={() => setActiveTab("vendors")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${activeTab === "vendors" ? "bg-indigo-600" : "bg-slate-700 hover:bg-slate-600"}`}
          >
            Vendors ({totalVendors})
          </button>
        </div>

        {activeTab === "bookings" && (
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Event Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Client</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Guests</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Vendor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length > 0 ? (
                    bookings.map((b, i) => (
                      <tr key={i} className="border-t border-slate-700 hover:bg-slate-700/30">
                        <td className="px-6 py-4">{b.eventName || "N/A"}</td>
                        <td className="px-6 py-4">{b.clientName || b.name || "N/A"}</td>
                        <td className="px-6 py-4">{b.date || "N/A"}</td>
                        <td className="px-6 py-4">{b.people || "N/A"}</td>
                        <td className="px-6 py-4">{b.service || "N/A"}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteBooking(i)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded text-sm font-semibold"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-slate-700">
                      <td colSpan="6" className="px-6 py-8 text-center text-slate-400">
                        No bookings yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "vendors" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.length > 0 ? (
              vendors.map((v, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition">
                  {v.image && <img src={v.image} alt={v.name} className="w-full h-40 object-cover rounded mb-4" />}
                  <h3 className="text-xl font-bold">{v.name}</h3>
                  <p className="text-slate-300 mt-1">{v.service}</p>
                  <p className="text-green-400 font-semibold mt-2">₹{v.price}</p>
                  <p className="text-slate-400 text-sm mt-1">📞 {v.contact}</p>
                  <button
                    onClick={() => handleDeleteVendor(i)}
                    className="w-full mt-4 px-3 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold text-sm"
                  >
                    Delete Vendor
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-slate-400">No vendors yet</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
