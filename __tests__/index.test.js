import { shallow } from "enzyme";
import React from "react";

import App from "../pages/index.js";

describe("With Enzyme", () => {
  it('App shows a main heading', () => {
    const app = shallow(<App />);
    expect(app.find("h1").text()).toEqual("Find nearby places of interest");
  });
});