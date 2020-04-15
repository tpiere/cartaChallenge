import { getVenues } from "../../io/foursquare";
import { getNearbyPlaces } from "../../services/nearbyPlaces";

jest.mock("../../io/foursquare");

describe("nearbyPlaces service", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should return mapped places", async () => {
    getVenues.mockResolvedValue({
      meta: { code: 200 },
      response: {
        venues: [
          {
            id: "4baa8fd4f964a520cd743ae3",
            name: "Tower Coffee Bar And Grill",
            location: {
              formattedAddress: [
                "1101 Tacoma Ave S (at S 11th St)",
                "Tacoma, WA 98402",
                "United States",
              ],
            },
          },
          {
            id: "4b8d5e96f964a5208ef732e3",
            name: "Tacoma Public Library - Main",
            location: {
              formattedAddress: [
                "1102 Tacoma Ave S",
                "Tacoma, WA 98402",
                "United States",
              ],
            },
          },
        ],
      },
    });
    const places = await getNearbyPlaces("Tacoma");

    expect(places).toEqual([
      {
        formattedAddressParts: [
          "1101 Tacoma Ave S (at S 11th St)",
          "Tacoma, WA 98402",
          "United States",
        ],
        id: "4baa8fd4f964a520cd743ae3",
        name: "Tower Coffee Bar And Grill",
      },
      {
        formattedAddressParts: [
          "1102 Tacoma Ave S",
          "Tacoma, WA 98402",
          "United States",
        ],
        id: "4b8d5e96f964a5208ef732e3",
        name: "Tacoma Public Library - Main",
      },
    ]);
  });

  it("should throw an error when the request is not successful", async () => {
    getVenues.mockResolvedValue({
      meta: {
        code: 400,
        errorDetail: "Couldn't geocode param near: fremont brewery",
      },
      response: {},
    });
    expect.assertions(1);
    try {
      await getNearbyPlaces("fremont brewery");
    } catch (e) {
      expect(e.message).toMatch("Couldn't geocode param near: fremont brewery");
    }
  });

  it("should throw an error when the searchQuery is empty", async () => {
    expect.assertions(1);
    try {
      await getNearbyPlaces("");
    } catch (e) {
      expect(e.message).toMatch("Search location cannot be empty");
    }
  });
});
