import React from "react";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-800 to-black p-6 text-white">
      
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h2>👥 Total Users</h2>
          <p className="text-3xl font-bold mt-2">10</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h2>📦 Vendors</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:scale-105 transition">
          <h2>📅 Events</h2>
          <p className="text-3xl font-bold mt-2">8</p>
        </div>

      </div>

      {/* Users Table */}
      <div className="mt-10 bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4">📋 Users</h2>

        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white/20">
              <td className="p-2">Rahul</td>
              <td className="p-2">Client</td>
              <td className="p-2">Active</td>
            </tr>
            <tr className="bg-white/20">
              <td className="p-2">Amit</td>
              <td className="p-2">Vendor</td>
              <td className="p-2">Approved</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminDashboard;