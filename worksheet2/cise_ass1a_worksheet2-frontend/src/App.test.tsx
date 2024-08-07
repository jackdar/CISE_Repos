import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { createRoot } from "react-dom/client";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div!);
  root.render(<App />);
  root.unmount();
});

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});
