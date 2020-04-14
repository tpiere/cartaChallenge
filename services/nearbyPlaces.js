
import initFoursquare from 'react-foursquare';

const foursquare = initFoursquare({
    clientID: 'TAXOBMJS5OPJQ5LFSKZQZH4H5AEBGPWB1HRKA5X52MHEZHO1',
    clientSecret: 'BHIGYQV3V0314KKAMXRQ2WLHNU222G0JTPP3JPJZFNUVHAJ2'
});


export async function getNearbyPlaces(searchQuery){
    const result = await foursquare.venues.getVenues({near:searchQuery});
    if(result?.meta?.code !== 200 ){
        throw new Error(result.meta.errorDetail)
    }
    const nearbyPlaces = result.response.venues.map((venue)=> {
        const {id, name, location:{formattedAddress: formattedAddressParts}} = venue
        return {
            name,
            formattedAddressParts,
            id
        };

    });
    return nearbyPlaces;
}