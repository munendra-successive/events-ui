import { BulkUplaod } from "../components";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuth } from "../components";
import axios from "axios";
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

jest.mock("axios");

describe("Testing BulkUpload Page", () => {
  const mockUserAuthValue = {
    login: true,
  };
  test("Testing BulkList Page correctly rendering or not", () => {
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <BulkUplaod />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("CSV File Uploader")).toBeInTheDocument();
    expect(screen.getByText("Upload CSV")).toBeInTheDocument();
  });
});
