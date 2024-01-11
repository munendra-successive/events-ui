import { BulkList } from "../components";
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

describe("Testing BulkList Page", () => {
  const mockUserAuthValue = {
    login: true,
  };
  test("Testing BUlkList Page correctly rendering or not", () => {
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <BulkList />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("BulkList")).toBeInTheDocument();
    expect(screen.getByText("Filename")).toBeInTheDocument();
    expect(screen.getByText("SuccessfulInserted")).toBeInTheDocument();
    expect(screen.getByText("FailedDuringInsert")).toBeInTheDocument();
    expect(screen.getByText("FailedDuringInsert")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("View Logs")).toBeInTheDocument();


  });
});
