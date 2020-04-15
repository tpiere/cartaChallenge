import { getVenues } from '../../io/foursquare';
import { getNearbyPlaces } from '../../services/nearbyPlaces';

jest.mock('../../io/foursquare')

describe('nearbyPlaces service', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks()

    });

    it('should return mapped places', async () => {

        getVenues.mockResolvedValue(
            {
                "meta": { "code": 200, }, "response": {
                    "venues": [{
                        "id": "4baa8fd4f964a520cd743ae3",
                        "name": "Tower Coffee Bar And Grill",
                        "location": {
                            "formattedAddress": ["1101 Tacoma Ave S (at S 11th St)", "Tacoma, WA 98402", "United States"]
                        }
                    }, {
                        "id": "4b8d5e96f964a5208ef732e3",
                        "name": "Tacoma Public Library - Main",
                        "location": {
                            "formattedAddress": ["1102 Tacoma Ave S", "Tacoma, WA 98402", "United States"]
                        }
                    }]
                }

            }

        )
        const places = await getNearbyPlaces('Tacoma');

        expect(places).toEqual([{ "formattedAddressParts": [
            "1101 Tacoma Ave S (at S 11th St)", "Tacoma, WA 98402", "United States"], 
            "id": "4baa8fd4f964a520cd743ae3", "name": "Tower Coffee Bar And Grill" }, 
            { "formattedAddressParts": ["1102 Tacoma Ave S", "Tacoma, WA 98402", "United States"], 
            "id": "4b8d5e96f964a5208ef732e3", 
            "name": "Tacoma Public Library - Main" }])
    });


});