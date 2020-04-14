import Layout from '../components/Layout';
import Head from 'next/head'
import { useState } from 'react';
import initFoursquare from 'react-foursquare';

const foursquare = initFoursquare({
    clientID: 'TAXOBMJS5OPJQ5LFSKZQZH4H5AEBGPWB1HRKA5X52MHEZHO1',
    clientSecret: 'BHIGYQV3V0314KKAMXRQ2WLHNU222G0JTPP3JPJZFNUVHAJ2'
});


function Venue({name, formattedAddress}){
    return (<article>
        <h1>{name}</h1>
        <p>{formattedAddress}</p>
    </article>)
}

export default function Home() {
    const [searchInput, setSearchInput] = useState('');
    const [nearbyPlaces, setNearbyPlaces] = useState(null);

    async function submitSearch(e) {
        console.log(`search for: ${searchInput}`);
        e.preventDefault();
        const venues = await foursquare.venues.getVenues({near:searchInput});
        setNearbyPlaces(venues)
            
        return false;
    }
    return (
        <Layout>
            <div>
                <Head>
                    <title>Carta Challenge</title>
                </Head>
                <h1>Find nearby places of interest</h1>
                <form onSubmit={submitSearch}>
                    <label htmlFor="locationInput">Enter a location</label>
                    <input type="text" placeholder="Seattle, WA" id="locationInput" value={searchInput} onChange={(event) => { setSearchInput(event.target.value); }} />
                    <button type="submit">Search</button>
                    {nearbyPlaces?.response?.venues?.map((venue)=> {
                        const name  = venue.name;
                        const formattedAddress = venue.location.formattedAddress?.join(', ')
                        return (<Venue name={name} formattedAddress={formattedAddress} />);
                    })}
                </form>
            </div>
        </Layout>
    );
}