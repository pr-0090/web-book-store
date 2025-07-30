import React from "react";
import { render } from "@testing-library/react";
import DummyComponent from "./DummyComponent";

describe("WishListPageComponent", () => {
  it("renders without crashing", () => {
    render(<DummyComponent />);
  });
});
