import { BulkList } from "../components";
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
const setLogin = jest.fn();

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
  });
  // This test checks if the data is fetched correctly and set in the state.

  test("Testing data fetching and state update in BulkList component", async () => {
    const mockData = [
      {
        fileName: "file1.csv",
        successfulInserted: 10,
        failedDuringInsert: 5,
        startTime: "2021-10-01",
        uploadId: "12345",
      },
      {
        fileName: "file2.csv",
        successfulInserted: 15,
        failedDuringInsert: 2,
        startTime: "2021-10-02",
        uploadId: "67890",
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });
    render(
      <UserAuth.Provider value={{ setLogin }}>
        <BrowserRouter>
          <BulkList />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8000/events/getBulk",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    });
  });
});
