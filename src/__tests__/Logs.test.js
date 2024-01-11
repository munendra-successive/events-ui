import Logs from "../components/events/Logs";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuth } from "../components";
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

describe("Testing Logs  Page", () => {
  const mockUserAuthValue = {
    login: true,
  };
  test("Testing Logs Page correctly rendering or not", () => {
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <Logs />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Error Details")).toBeInTheDocument();
    expect(screen.getByText("Row Number")).toBeInTheDocument();
    expect(screen.getByText("Error Message")).toBeInTheDocument();



  });
});
