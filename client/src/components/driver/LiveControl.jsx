import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function LiveControl() {
  const [live, setLive] = useState(false);
  const busId = "BUS_01"; // real bus id later

  useEffect(() => {
    socket.emit("joinBus", busId);
  }, []);

  useEffect(() => {
    let interval;

    if (live) {
      interval = setInterval(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
          socket.emit("driverLocation", {
            busId,
            location: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            }
          });
        });
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [live]);

  return (
    <div className="bg-white p-6 rounded-xl border">
      <h3 className="text-lg font-semibold mb-4">Live Tracking</h3>

      <button
        onClick={() => setLive(!live)}
        className={`px-6 py-3 rounded-lg text-white ${
          live ? "bg-red-600" : "bg-green-600"
        }`}
      >
        {live ? "Stop Tracking" : "Start Tracking"}
      </button>
    </div>
  );
}
