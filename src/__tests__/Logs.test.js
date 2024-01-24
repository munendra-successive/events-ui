import Logs from "../components/events/Logs";
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
describe("Testing Logs  Page", () => {
  test("Testing Logs Page rendering correctly", async () => {
    const login = true;
    axios.get.mockResolvedValue({
      data: {
        data: [
          {
            rowNumber: 2,
            errorMessage: "endDate must be greater than start Date",
          },
        ],
      },
    });
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Logs />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    await waitFor(() => {
      expect(
        screen.getByText("endDate must be greater than start Date")
      ).toBeInTheDocument();
    });
  });

  test("Testing Logs Page if user is authenticated", async () => {
    const login = true;
    axios.get.mockRejectedValue({
      response: {
        status: 403,
      },
    });
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Logs />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    await waitFor(() => {
      expect(
        screen.getByText("You are Unauthorized, Please Login")
      ).toBeInTheDocument();
    });
  });

  test("Testing Logs Page if error occurs", async () => {
    const login = true;
    axios.get.mockRejectedValue({
      response: {
        status: 500,
      },
    });
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Logs />
        </BrowserRouter>
      </UserAuth.Provider>
    );
  });
});
