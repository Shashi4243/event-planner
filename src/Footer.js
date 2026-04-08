import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-white mt-16">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <h1 className="text-3xl font-bold text-purple-500 mb-3">
            Event Planner 🎉
          </h1>
          <p className="text-gray-400 text-sm leading-6">
            Discover and book the best vendors for your events.
            We make your planning simple, fast, and memorable.
          </p>
        </div>

        {/* SERVICES */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Services
          </h2>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-purple-400 cursor-pointer">DJ Booking</li>
            <li className="hover:text-purple-400 cursor-pointer">Catering</li>
            <li className="hover:text-purple-400 cursor-pointer">Venue</li>
            <li className="hover:text-purple-400 cursor-pointer">Decoration</li>
          </ul>
        </div>

        {/* FOUNDERS */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Founders
          </h2>
          <p className="text-gray-400">Shashi</p>
          <p className="text-gray-400">Diwanshu</p>
          <p className="text-gray-400">Aman</p>

          <div className="mt-4">
            <p className="text-gray-400">📞 +91 9608662487</p>
            <p className="text-gray-400">📞 +91 8507889838</p>
            <p className="text-gray-400">📧 eventplanner.support@gmail.com</p>
          </div>
        </div>

        {/* NEWSLETTER + MAP */}
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Stay Updated
          </h2>

          <input
            placeholder="Enter your email"
            className="w-full p-2 rounded bg-gray-800 text-white mb-3 outline-none"
          />

          <button className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded">
            Subscribe
          </button>

          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Patna&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-32 mt-4 rounded"
          ></iframe>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 py-4 text-center text-gray-500 text-sm">
        © 2026 Event Planner | Built with ❤️ by Shashi, Diwanshu & Aman
      </div>

    </footer>
  );
}

export default Footer;