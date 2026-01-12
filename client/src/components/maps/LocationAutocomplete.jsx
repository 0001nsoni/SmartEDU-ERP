import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../../../utils/loadGoogleMaps"

export default function LocationAutocomplete({ onSelect }) {
  const inputRef = useRef(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      const autocomplete =
        new window.google.maps.places.Autocomplete(
          inputRef.current,
          { types: ["geocode"] }
        );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        onSelect({
          name: place.formatted_address || place.name,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        });
      });
    });
  }, [onSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search location"
      className="border p-2 w-full rounded"
    />
  );
}
