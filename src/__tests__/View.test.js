import { View } from "../components";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

describe("Testing View  Page", () => {
  const mockUserAuthValue = {
    login: true,
  };
  test("Testing View Page correctly rendering or not", () => {
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <View />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Event Name")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
