import Layout from "../components/Layout";
import Head from "next/head";
import { useState } from "react";
import { getNearbyPlaces } from "../services/nearbyPlaces";
import { VenueList } from "../components/VenueList";
import { GeolocateButton } from "../components/GeolocateButton";

const headingStyles = {
  textAlign: "center",
  lineHeight: 1.25,
};

const formStyles = {
  textAlign: "center",
};

const baseFormFieldStyles = {
  display: "block",
  textAlign: "center",
  marginTop: 20,
};

const horizontalCenterStyles = {
  marginLeft: "auto",
  marginRight: "auto",
};

const locationInputContainerStyles = {
  width: "100%",
  maxWidth: 600,
  display: "flex",
  ...horizontalCenterStyles,
  marginTop: 10,
};

const textLabelStyles = {
  ...baseFormFieldStyles,
};
const textInputStyles = {
  border: "1px solid #ddd",
  padding: 4,
  flex: "1 1 100%",
};
const searchButtonStyles = {
  ...baseFormFieldStyles,
  ...horizontalCenterStyles,
  boxSizing: "border-box",
  padding: 8,
  border: "2px solid #aaa",
};

const errorStyles = {
  textAlign: "center",
  color: "#d64040",
};

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState(null);
  const [searchError, setSearchError] = useState(null);

  async function submitSearch(e) {
    e.preventDefault();
    try {
      const venues = await getNearbyPlaces(searchInput);
      setNearbyPlaces(venues);
      setSearchError(null);
    } catch (ex) {
      setSearchError(ex.message);
      setNearbyPlaces(null);
    }

    return false;
  }

  function onCoordinatesRetrieved(coordinates) {
    const { latitude, longitude } = coordinates;
    setSearchInput(`${latitude}, ${longitude}`);
  }

  return (
    <Layout>
      <div>
        <Head>
          <title>Carta Challenge</title>
        </Head>
        <h1 style={headingStyles}>Find nearby places of interest</h1>
        <form style={formStyles} onSubmit={submitSearch}>
          <label style={textLabelStyles} htmlFor="locationInput">
            Enter a location
          </label>
          <div style={locationInputContainerStyles}>
            <input
              type="text"
              placeholder="Seattle, WA"
              id="locationInput"
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              style={textInputStyles}
            />
            <GeolocateButton onCoordinatesRetrieved={onCoordinatesRetrieved} />
          </div>

          <button style={searchButtonStyles} type="submit">
            Search
          </button>
        </form>
        <VenueList nearbyPlaces={nearbyPlaces} />
        {searchError != null && <p style={errorStyles}>{searchError}</p>}
      </div>
    </Layout>
  );
}
