import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../../../utils/loadGoogleMaps";

export default function RouteMapPreview({ stops }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!stops || stops.length < 2) return;

    loadGoogleMaps().then(() => {
      // ✅ ENSURE LAT/LNG EXISTS
      const validStops = stops.filter(
        (s) => s.lat && s.lng
      );
      if (validStops.length < 2) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: {
          lat: validStops[0].lat,
          lng: validStops[0].lng
        },
        zoom: 12
      });

      const directionsService =
        new window.google.maps.DirectionsService();
      const directionsRenderer =
        new window.google.maps.DirectionsRenderer({
          suppressMarkers: false
        });

      directionsRenderer.setMap(map);

      directionsService.route(
        {
          origin: validStops[0],
          destination: validStops[validStops.length - 1],
          waypoints: validStops
            .slice(1, -1)
            .map((s) => ({
              location: { lat: s.lat, lng: s.lng },
              stopover: true
            })),
          travelMode: "DRIVING"
        },
        (result, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(result);
          } else {
            console.error("Directions error:", status);
          }
        }
      );
    });
  }, [stops]);

  return (
    <div
      ref={mapRef}
      className="w-full rounded-lg border"
      style={{ height: "350px" }} // 🔥 REQUIRED
    />
  );
}
