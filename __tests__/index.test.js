import { getNearbyPlaces } from "../services/nearbyPlaces";
import App from "../pages/index.js";

// import dependencies
import React from "react";

// import react-testing methods
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

// add custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";

jest.mock("../services/nearbyPlaces");

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

  it("displays nearby places", async () => {
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
