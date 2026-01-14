import { useEffect, useState } from "react";
import api from "../../services/api";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function DriverDashboard() {
  const [bus, setBus] = useState(null);

  useEffect(() => {
    api.get("/drivers/dashboard").then(res => {
      setBus(res.data.bus);
    });
  }, []);

  const sendLocation = () => {
    if (!bus) return;

    navigator.geolocation.getCurrentPosition(pos => {
      socket.emit("driver:location", {
        busId: bus._id,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      });
    });
  };

  if (!bus) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Driver Dashboard
      </h2>

      <p><b>Bus:</b> {bus.busNumber}</p>
      <p><b>Capacity:</b> {bus.capacity}</p>

      <button
        onClick={sendLocation}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Share Live Location
      </button>
    </div>
  );
}
