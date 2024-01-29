import Sidebar from "../modules/events/Sidebar";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

describe("Testing Sidebar", () => {
  test("Testing Sidebar Page correctly rendering or not", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
    const listButton = screen.getByText("List");
    fireEvent.click(listButton);
    expect(window.location.pathname).toBe("/list");
    const bulkListButton = screen.getByText("Bulk Listing");
    fireEvent.click(bulkListButton);
    expect(window.location.pathname).toBe("/bulkDetails");
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(window.location.pathname).toBe("/");
  });
});
