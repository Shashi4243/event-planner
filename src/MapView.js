import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon path for many bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapView({ events = [] }) {
  const [markers, setMarkers] = useState([]);
  const center = [20.5937, 78.9629]; // default center (India)

  useEffect(() => {
    if (events && events.length > 0) {
      // use provided events
      setMarkers(
        events
          .map((ev) => {
            const lat = parseFloat(ev.lat || ev.latitude || ev.latLng?.lat);
            const lng = parseFloat(ev.lng || ev.longitude || ev.latLng?.lng);
            if (!lat || !lng) return null;
            return {
              lat,
              lng,
              title: ev.title || ev.name || "Event",
              desc: ev.venue || ev.address || "",
            };
          })
          .filter(Boolean)
      );
      return;
    }

    // If no events prop, try to load vendors/events from localStorage
    const localVendors = JSON.parse(localStorage.getItem("vendors")) || [];
    const localEvents = JSON.parse(localStorage.getItem("events")) || [];

    const fromVendors = localVendors
      .map((v) => {
        const lat = parseFloat(v.lat || v.latitude || v.latLng?.lat);
        const lng = parseFloat(v.lng || v.longitude || v.latLng?.lng);
        if (!lat || !lng) return null;
        return { lat, lng, title: v.name || "Vendor", desc: v.service || "" };
      })
      .filter(Boolean);

    const fromEvents = localEvents
      .map((e) => {
        const lat = parseFloat(e.lat || e.latitude || e.latLng?.lat);
        const lng = parseFloat(e.lng || e.longitude || e.latLng?.lng);
        if (!lat || !lng) return null;
        return { lat, lng, title: e.name || "Event", desc: e.location || "" };
      })
      .filter(Boolean);

    const combined = [...fromEvents, ...fromVendors];
    setMarkers(combined);
  }, [events]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Nearby events</h2>
      <div className="w-full h-80 rounded overflow-hidden shadow">
        <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {markers.length === 0 ? null : markers.map((m, i) => (
            <Marker key={i} position={[m.lat, m.lng]}>
              <Popup>
                <div className="max-w-xs">
                  <strong>{m.title}</strong>
                  <div>{m.desc}</div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {markers.length === 0 && (
        <div className="mt-2 text-sm text-gray-500">No mapped events/vendors found. Add `lat` and `lng` to your events/vendors in localStorage to display markers.</div>
      )}
    </div>
  );
}
