import { useState } from "react";
import { createRoute } from "../../services/adminApi";
import LocationAutocomplete from "../maps/LocationAutocomplete";
import RouteMapPreview from "../maps/RouteMapPreview";

export default function CreateRoute({ onCreated }) {
  const [routeName, setRouteName] = useState("");
  const [stops, setStops] = useState([]);
  const [pendingStop, setPendingStop] = useState(null);

  // called when user selects a place
  const onSelectStop = (place) => {
    setPendingStop(place);
  };

  // confirm adding stop
  const addStop = () => {
    if (!pendingStop) return;
    setStops([...stops, pendingStop]);
    setPendingStop(null);
  };

  const removeStop = (index) => {
    setStops(stops.filter((_, i) => i !== index));
  };

  const submit = async () => {
    await createRoute({
      routeName,
      stops
    });
    onCreated();
    alert("Route created");
  };

  return (
    <div className="bg-white p-6 rounded-xl border space-y-4">
      <h3 className="text-lg font-semibold">Create Route</h3>

      {/* Route name */}
      <input
        className="border p-2 w-full rounded"
        placeholder="Route Name"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
      />

      {/* Autocomplete */}
      <LocationAutocomplete onSelect={onSelectStop} />

      {/* Add stop button */}
      <button
        onClick={addStop}
        disabled={!pendingStop}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Add Stop
      </button>

      {/* Stop list */}
      {stops.length > 0 && (
        <div className="border rounded p-3">
          <p className="font-medium mb-2">Route Stops</p>
          <ol className="list-decimal pl-5 space-y-1">
            {stops.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center"
              >
                <span>{s.name}</span>
                <button
                  onClick={() => removeStop(i)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Map preview */}
      {stops.length > 1 && (
        <RouteMapPreview stops={stops} />
      )}

      {/* Create route */}
      <button
        onClick={submit}
        disabled={stops.length < 2 || !routeName}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
      >
        Create Route
      </button>
    </div>
  );
}
