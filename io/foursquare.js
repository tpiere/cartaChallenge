import initFoursquare from 'react-foursquare';
export const foursquare = initFoursquare({
    clientID: 'TAXOBMJS5OPJQ5LFSKZQZH4H5AEBGPWB1HRKA5X52MHEZHO1',
    clientSecret: 'BHIGYQV3V0314KKAMXRQ2WLHNU222G0JTPP3JPJZFNUVHAJ2'
});


export async function getVenues(params){
    return await foursquare.venues.getVenues(params);
}