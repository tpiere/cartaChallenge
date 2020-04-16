import { useState, useEffect } from "react";
import { MdMyLocation } from "react-icons/md";
import { getCurrentPosition } from "../services/geolocation";
import { hasGeolocation } from "../services/globals";

const geolocateButtonStyles = { flex: "0 0 auto", marginLeft: 10, padding: 6 };

const iconStyles = { verticalAlign: "text-top" };

export function GeolocateButton({ onCoordinatesRetrieved }) {
  const [hasGeolocationAvailable, setHasGeolocationAvailable] = useState(false);

  useEffect(() => {
    setHasGeolocationAvailable(hasGeolocation());
  }, []);

  async function handleGetCoordinates() {
    const coordinates = await getCurrentPosition();
    onCoordinatesRetrieved(coordinates);
  }

  if (!hasGeolocationAvailable) {
    return null;
  }
  return (
    <button
      style={geolocateButtonStyles}
      type="button"
      onClick={handleGetCoordinates}
    >
      <MdMyLocation style={iconStyles} />
      <span>Use current location</span>
      <style jsx>
        {`
          span {
            display: none;
          }
          @media screen and (min-width: 767px) {
            span {
              display: inline;
              margin-left: 5px;
            }
          }
        `}
      </style>
    </button>
  );
}
