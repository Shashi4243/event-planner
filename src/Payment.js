import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const ev = JSON.parse(localStorage.getItem("lastEvent"));
    setLastEvent(ev);
  }, []);

  const handlePay = () => {
    if (processing) return;
    setProcessing(true);

    // simulate payment delay
    setTimeout(() => {
      // ensure lastEvent exists (derive from bookings if needed)
      const existing = JSON.parse(localStorage.getItem("lastEvent"));
      if (!existing) {
        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        const lastBooking = bookings[bookings.length - 1];
        if (lastBooking) {
          const derived = {
            name: lastBooking.eventName || lastBooking.name || "",
            date: lastBooking.date || "",
            location: lastBooking.venue || lastBooking.name || "",
            guests: lastBooking.people || lastBooking.guests || "",
            services: [lastBooking.service || lastBooking.service || ""],
          };
          localStorage.setItem("lastEvent", JSON.stringify(derived));
          setLastEvent(derived);
        }
      }

      setBookingId(`BK-${Math.floor(100000 + Math.random() * 900000)}`);
      setProcessing(false);
      setPaid(true);
    }, 900);
  };

  if (paid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-700 text-white py-12 px-4">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-violet-400/30 blur-3xl"></div>
          <div className="absolute -right-10 bottom-10 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl"></div>

          <div className="relative p-10 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-5xl text-emerald-200 shadow-lg ring-2 ring-white/20">
              ✅
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight">Booking Complete</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-200 sm:text-base">
              Your event is confirmed and everything is set. We’ve sent your booking details to your inbox, and your vendor will be notified shortly.
            </p>

            {lastEvent && (
              <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-left shadow-xl sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Booking ID</div>
                  <div className="mt-2 text-lg font-semibold text-white">{bookingId}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Total Paid</div>
                  <div className="mt-2 text-lg font-semibold text-emerald-300">₹1500</div>
                </div>

                <div className="sm:col-span-2 rounded-2xl bg-slate-900/90 p-4">
                  <div className="text-sm uppercase tracking-[0.2em] text-slate-500">Event Summary</div>
                  <div className="mt-3 text-xl font-semibold text-white">{lastEvent.name}</div>
                  <p className="mt-2 text-sm text-slate-300">{lastEvent.date} • {lastEvent.location}</p>
                  <p className="mt-3 text-sm text-slate-300">Guests: {lastEvent.guests || 'N/A'}</p>
                  <p className="mt-1 text-sm text-slate-300">Services: {(Array.isArray(lastEvent.services) ? lastEvent.services : [lastEvent.services || '']).join(', ')}</p>
                </div>
              </div>
            )}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button onClick={() => navigate('/summary')} className="inline-flex items-center justify-center rounded-full bg-violet-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                View Booking Details
              </button>
              <button onClick={() => navigate('/client')} className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/20">
                Back to Dashboard
              </button>
            </div>

            <div className="mt-8 text-sm text-slate-300">
              Need help? Reach out to support anytime and we’ll assist with changes, updates, or upgrades.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-3xl w-full px-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

          <div className="p-8 bg-gradient-to-b from-indigo-600 to-indigo-500 text-white">
            <h3 className="text-2xl font-bold">Secure Payment</h3>
            <p className="mt-3 text-indigo-100">Complete your payment to confirm the booking.</p>

            {lastEvent ? (
              <div className="mt-6 bg-white/10 p-3 rounded">
                <div className="text-sm">Event</div>
                <div className="font-semibold text-lg">{lastEvent.name}</div>
                <div className="text-sm mt-1">{lastEvent.date} • {lastEvent.location}</div>
              </div>
            ) : (
              <div className="mt-6 text-sm text-indigo-100">No event info available — latest booking will be used.</div>
            )}
          </div>

          <div className="p-8">
            <h4 className="text-lg font-semibold mb-4">Payment details</h4>

            <input className="w-full border rounded p-3 mt-1 mb-3" placeholder="Card number" />
            <div className="flex gap-3">
              <input className="flex-1 border rounded p-2" placeholder="MM/YY" />
              <input className="w-28 border rounded p-2" placeholder="CVV" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-500">Amount</div>
                <div className="text-2xl font-bold">₹1500</div>
              </div>

              <button
                onClick={handlePay}
                className={`px-6 py-3 rounded-lg text-white font-semibold ${processing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
                disabled={processing}
              >
                {processing ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </div>

        </div>
        <p className="text-center text-sm text-gray-500 mt-3">Payments are simulated for demo. No real charge.</p>
      </div>
    </div>
  );
}

export default Payment;