import { NotFound } from "../components";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

describe("Testing Not Found", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  test("check if not found renders or not", () => {
    expect(screen.getByText("404 - Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, the page you are looking for does not exist.")
    ).toBeInTheDocument();
  });
});
