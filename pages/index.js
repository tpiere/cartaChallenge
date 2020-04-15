import Layout from "../components/Layout";
import Head from "next/head";
import { useState, useEffect } from "react";
import { getNearbyPlaces } from "../services/nearbyPlaces";
import { VenueList } from "../components/VenueList";
import { MdMyLocation } from 'react-icons/md';
import { findByLabelText } from "@testing-library/react";

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

const textLabelStyles = {
  ...baseFormFieldStyles,
};
const textInputStyles = {
  border: "1px solid #ddd",
  padding: 4,
  flex: '1 1 100%'
};
const buttonStyles = {
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
  const [hasGeolocationAvailable, setHasGeolocationAvailable] = useState(false);

  useEffect(() => {
    if(typeof window !== 'undefined' && window.navigator?.geolocation != null){
        setHasGeolocationAvailable(true);
      }    
  }, []);

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
          <div
            style={{
                width: '100%',
                maxWidth: 600,
                display: 'flex',
                ...horizontalCenterStyles,
                marginTop: 10
            }
            }
          >
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
          {hasGeolocationAvailable &&
           <button style={{flex: '0 0 auto', marginLeft: 10, padding:6}} type="button" onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    // console.log(position.coords.latitude, position.coords.longitude);
                    setSearchInput(`${latitude}, ${longitude}`);
                });

           }}>
            <MdMyLocation style={{verticalAlign: 'text-top'}}/>
            <span>Use current location</span>
            <style jsx>
                {`
                    span {
                        display: none;
                    }
                    @media screen and (min-width: 767px){
                        span {
                            display: inline;
                            margin-left: 5px;
                        }
                    }
                `}
            </style>
          </button>
          }
          </div>
          
          <button style={buttonStyles} type="submit">
            Search
          </button>
        </form>
        <VenueList nearbyPlaces={nearbyPlaces} />
        {searchError != null && <p style={errorStyles}>{searchError}</p>}
      </div>
    </Layout>
  );
}
