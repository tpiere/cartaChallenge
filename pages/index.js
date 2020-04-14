import Layout from '../components/Layout';
import Head from 'next/head'
import { useState } from 'react';
import { getNearbyPlaces } from '../services/nearbyPlaces';
import { Venue } from '../components/Venue';


export default function Home() {
    const [searchInput, setSearchInput] = useState('');
    const [nearbyPlaces, setNearbyPlaces] = useState(null);
    const [searchError, setSearchError] = useState(null);

    async function submitSearch(e) {
        console.log(`search for: ${searchInput}`);
        e.preventDefault();
        try {
            const venues = await getNearbyPlaces(searchInput);
            setNearbyPlaces(venues)
            setSearchError(null);
        }
        catch (ex) {
            console.error(ex)
            setSearchError(ex.message);
        }

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
                    <input type="text" 
                    placeholder="Seattle, WA" 
                    id="locationInput" 
                    value={searchInput} 
                    onChange={(event) => { setSearchInput(event.target.value); }} />
                    <button type="submit">Search</button>

                </form>
                {nearbyPlaces?.map((venue) => {
                    const {name, formattedAddressParts, id} = venue;
                    const formattedAddress = formattedAddressParts?.join(', ')
                    return (<Venue key={id} name={name} formattedAddress={formattedAddress} />);
                })}
                {searchError != null && <span>{searchError}</span>}

            </div>
        </Layout>
    );
}