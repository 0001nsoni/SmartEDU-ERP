import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function LiveBusMap() {
  const [position, setPosition] = useState(null);
  const busId = "BUS_01";

  useEffect(() => {
    socket.emit("joinBus", busId);

    socket.on("busLocationUpdate", (location) => {
      setPosition(location);
    });

    return () => socket.off("busLocationUpdate");
  }, []);

  if (!position)
    return <p className="text-slate-500">Waiting for bus location...</p>;

  return (
    <div className="bg-white rounded-xl border p-4">
      <h3 className="text-lg font-semibold mb-3">Live Bus Location</h3>

      <MapContainer
        center={position}
        zoom={15}
        className="h-64 w-full rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}
