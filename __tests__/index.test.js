import { getNearbyPlaces } from "../services/nearbyPlaces";
import { getCurrentPosition } from "../services/geolocation";
import { hasGeolocation, getGeolocation } from "../services/globals";
import App from "../pages/index.js";

// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

jest.mock("../services/nearbyPlaces");
jest.mock("../services/geolocation");
jest.mock("../services/globals");

describe("App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("renders a main heading", () => {
    const { container, asFragment } = render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Find nearby places of interest"
    );
  });

  it("displays nearby places from text input", async () => {
    getNearbyPlaces.mockResolvedValue([
      {
        id: 1,
        name: "place 1",
        formattedAddressParts: ["111 1st street", "Seattle", "WA"],
      },
    ]);

    const { findByText, getByLabelText } = render(<App />);

    fireEvent.change(getByLabelText("Enter a location"), {
      target: { value: "Seattle, WA" },
    });

    const searchButton = await findByText("Search");
    fireEvent.click(searchButton);

    const firstResult = await findByText("place 1");
    expect(firstResult).toBeDefined();
  });

  it("displays nearby places using geolocation", async () => {
    getNearbyPlaces.mockResolvedValue([
      {
        id: 1,
        name: "place 1",
        formattedAddressParts: ["111 1st street", "Seattle", "WA"],
      },
    ]);

    hasGeolocation.mockReturnValue(true);
    getCurrentPosition.mockResolvedValue({
      latitude: 47.6097236,
      longitude: -122.344387,
    });

    const { findByText, findByDisplayValue } = render(<App />);

    const useCurrentLocationButton = await findByText("Use current location");
    fireEvent.click(useCurrentLocationButton);

    await findByDisplayValue("47.6097236, -122.344387");

    const searchButton = await findByText("Search");
    fireEvent.click(searchButton);

    const firstResult = await findByText("place 1");
    expect(firstResult).toBeDefined();
  });

  it("displays an error message when getNearbyPlaces throws an error ", async () => {
    getNearbyPlaces.mockImplementation(() => {
      throw new Error("mocked error");
    });

    const { findByText, getByLabelText } = render(<App />);

    fireEvent.change(getByLabelText("Enter a location"), {
      target: { value: "Seattle, WA" },
    });

    const searchButton = await findByText("Search");
    fireEvent.click(searchButton);

    const errorText = await findByText("mocked error");
    expect(errorText).toBeDefined();
  });
});
