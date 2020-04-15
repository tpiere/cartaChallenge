import {getVenues} from '../io/foursquare'

export async function getNearbyPlaces(searchQuery){
    if(!searchQuery){
        throw new Error('Search location cannot be empty')
    }
    const result = await getVenues({near:searchQuery});
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