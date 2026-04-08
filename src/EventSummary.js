import React from "react";
import { useNavigate } from "react-router-dom";

function EventSummary() {
  const navigate = useNavigate();
  const event = JSON.parse(localStorage.getItem("lastEvent"));

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg">
          <p className="text-xl font-semibold text-slate-700">No booking details available yet.</p>
          <button
            onClick={() => navigate("/client")}
            className="mt-6 inline-flex rounded-full bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-16 px-4">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-[2rem] border border-white/60 bg-white/90 p-8 shadow-xl backdrop-blur-xl sm:p-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Booking confirmed</p>
              <h1 className="mt-3 text-4xl font-bold text-slate-900">Your event details</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Everything is set for your celebration. Review the booking summary and reach out if you want to update anything.
              </p>
            </div>
            <div className="rounded-3xl bg-indigo-600/10 px-6 py-4 text-center text-slate-900 shadow-sm">
              <p className="text-sm uppercase tracking-[0.24em] text-indigo-500">Status</p>
              <p className="mt-2 text-2xl font-semibold">Confirmed</p>
              <p className="mt-1 text-sm text-slate-500">Your vendor has been notified</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Event summary</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">{event.name}</h2>
              </div>
              <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                {event.date || "Date TBD"}
              </div>
            </div>

            <div className="space-y-4 text-slate-700">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">Location</p>
                <p className="mt-2 text-lg font-medium text-slate-900">{event.location || "Not specified"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">Guests</p>
                <p className="mt-2 text-lg font-medium text-slate-900">{event.guests || "N/A"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">Services included</p>
                <p className="mt-2 text-lg font-medium text-slate-900">
                  {(Array.isArray(event.services) ? event.services : [event.services || ""]).join(", ") || "No services listed"}
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-500">Notes</p>
                <p className="mt-2 text-slate-600">If you want to update the booking or add more details, head back to your dashboard.</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
            <div className="mb-6 rounded-3xl bg-slate-950/95 p-6 text-white shadow-inner">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick summary</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="font-medium text-slate-100">Event name</span>
                  <span>{event.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="font-medium text-slate-100">Location</span>
                  <span>{event.location || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="font-medium text-slate-100">Guest count</span>
                  <span>{event.guests || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span className="font-medium text-slate-100">Services</span>
                  <span>{(Array.isArray(event.services) ? event.services : [event.services || ""]).join(", ") || "—"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate("/client")}
                className="w-full rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Browse more vendors
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default EventSummary;
