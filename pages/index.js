import Layout from '../components/Layout';
import Head from 'next/head'
import { useState } from 'react';
import initFoursquare from 'react-foursquare';

const foursquare = initFoursquare({
    clientID: 'TAXOBMJS5OPJQ5LFSKZQZH4H5AEBGPWB1HRKA5X52MHEZHO1',
    clientSecret: 'BHIGYQV3V0314KKAMXRQ2WLHNU222G0JTPP3JPJZFNUVHAJ2'
});


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
                <form onSubmit={submitSearch}>
                    <label htmlFor="locationInput">Enter a location</label>
                    <input type="text" placeholder="Seattle, WA" id="locationInput" value={searchInput} onChange={(event) => { setSearchInput(event.target.value); }} />
                    <button type="submit">Search</button>
                    {JSON.stringify(nearbyPlaces)}
                </form>
            </div>
        </Layout>
    );
}