import { BulkUplaod } from "../modules";
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
const alertMock = jest.spyOn(window, "alert");
jest.mock("axios");

describe("Testing BulkUpload Page", () => {
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
    axios.post.mockResolvedValue(mockResponse);
    const login = true;

    render(
        <BrowserRouter>
          <BulkUplaod />
        </BrowserRouter>
    );

    const fileInput = screen.getByTestId("choose-file");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      const uploadButton = screen.getByText("Upload Csv");
      fireEvent.click(uploadButton);
      const successMessage = screen.getAllByText("File uploaded Successfully");
      expect(successMessage[0]).toBeInTheDocument();
    });
  });

  test("Unsuccessful file upload", async () => {
    const mockFile = new File(["dummy content"], "test.csv", {
      type: "text/csv",
    });
    axios.post.mockRejectedValue({ response: { status: 403 } });
    const login = true;

    render(
        <BrowserRouter>
          <BulkUplaod />
        </BrowserRouter>
    );

    const fileInput = screen.getByTestId("choose-file");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    await waitFor(() => {
      const uploadButton = screen.getByText("Upload Csv");
      fireEvent.click(uploadButton);
      const errorMessage = screen.getAllByText(
        "You are Unauthorized, Please Login"
      );
      expect(errorMessage[0]).toBeInTheDocument();
    });
  });
});
