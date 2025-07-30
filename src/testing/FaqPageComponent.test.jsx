import React from "react";
import { render } from "@testing-library/react";
import DummyComponent from "./DummyComponent";

describe("FaqPageComponent", () => {
  it("renders without crashing", () => {
    render(<DummyComponent />);
  });
});
