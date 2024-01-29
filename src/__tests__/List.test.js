import List from "../modules/events/List/List";
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

describe("Testing List Page", () => {
  test("Testing List Page correctly rendering or not", () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Upload Csv")).toBeInTheDocument();
  });

  test("Testing  Buttons ", () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
    const createButtton = screen.getByText("Create");
    fireEvent.click(createButtton);
    expect(window.location.pathname).toBe("/edit/create");
    const uploadCsvButton = screen.getByText("Upload Csv");
    fireEvent.click(uploadCsvButton);
    expect(window.location.pathname).toBe("/bulkUpload");
  });

  test("Testing  if list route is authenticated or not ", () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
  });

  test("Testing  Serach Bar", async () => {
    render(
      <BrowserRouter>
        <List />
      </BrowserRouter>
    );
    const searchBar = screen.getByPlaceholderText("Search");
    fireEvent.change(searchBar, { target: { value: "music" } });
    fireEvent.keyDown(searchBar, { key: "Enter", code: "Enter" });
  });
});
