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
  test("Testing BulkList Page correctly rendering or not", () => {
    const mockUserAuthValue = {
      login: true,
    };
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
  test("if user is not authenticated", () => {
    const login = false;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <BulkUplaod />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(window.location.pathname).toBe("/");
  });

  // Testing successful file upload

  test("Testing successful file upload", async () => {
    const mockFile = new File(["dummy content"], "test.csv", {
      type: "text/csv",
    });
    const mockResponse = {
      data: {
        message: "Upload successful!",
        numberOfItems: 10,
      },
    };
    axios.post.mockResolvedValueOnce(mockResponse);
    const login = true;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <BulkUplaod />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    const fileInput = screen.getByTestId("upload-button");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const uploadButton = screen.getByText("Upload CSV");
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(
        screen.getByText("Upload successful! number of items is: 10")
      ).toBeInTheDocument();
    });
  });

  test("Testing UnSuccessful file upload", async () => {
    const mockFile = new File(["dummy content"], "test.csv", {
      type: "text/csv",
    });
    const mockResponse = {
      data: {
        message: "Upload successful!",
        numberOfItems: 10,
      },
    };
    axios.post.mockRejectedValueOnce(mockResponse);
    const login = true;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <BulkUplaod />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    const fileInput = screen.getByTestId("upload-button");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    const uploadButton = screen.getByText("Upload CSV");
    fireEvent.click(uploadButton);
  });
});
