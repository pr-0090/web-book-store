import React from "react";
import { render } from "@testing-library/react";
import DummyComponent from "./DummyComponent";

describe("SingleProductComponent", () => {
  it("renders without crashing", () => {
    render(<DummyComponent />);
  });
});
