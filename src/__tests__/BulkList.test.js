import { BulkList } from "../modules";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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
  test("Testing BulkList Page correctly rendering or not", async () => {
    const mockData = [
      {
        fileName: "file1.csv",
        successfulInserted: 10,
        failedDuringInsert: 5,
        startTime: "2021-10-01",
        uploadId: "12345",
      },
    ];
    axios.get.mockResolvedValue({ data: { data: mockData } });
    render(
      <BrowserRouter>
        <BulkList />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("file1.csv")).toBeInTheDocument();
      const logButton = screen.getByText("View Log");
      fireEvent.click(logButton);
      expect(window.location.pathname).toBe("/logs/12345");
    });
  });

  test("Testing  fetching data if user is unauthorized", async () => {
    axios.get.mockRejectedValue({ response: { status: 403 } });
    render(
        <BrowserRouter>
          <BulkList />
        </BrowserRouter>
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("Testing  fetching data if error occurs", async () => {
    axios.get.mockRejectedValue({ response: { status: 500 } });
    render(
        <BrowserRouter>
          <BulkList />
        </BrowserRouter>
    );
  });
});
