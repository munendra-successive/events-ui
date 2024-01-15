import { Edit } from "../components";
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

describe("Testing Edit Page", () => {

  test("Testing Edit Page  displaying event data", async () => {
    const mockEventData = {
      name: "Test Event",
      address: {
        street: "Test Street",
        city: "Test City",
        state: "Test State",
        postalCode: "12345",
        country: "Test Country",
      },
      description: "Test Description",
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      category: "Test Category",
      organizerInfo: "Test Organizer",
      type: "Test Type",
      status: "Test Status",
    };
    axios.get.mockResolvedValueOnce({ data: { data: [mockEventData] } });
    const login = true;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    waitFor(() => {
      expect(screen.getByLabelText("Event Name")).toHaveValue("Test Event");
      expect(screen.getByLabelText("Street")).toHaveValue("Test Street");
      expect(screen.getByLabelText("City")).toHaveValue("Test City");
      expect(screen.getByLabelText("State")).toHaveValue("Test State");
      expect(screen.getByLabelText("Postal Code")).toHaveValue("12345");
      expect(screen.getByLabelText("Country")).toHaveValue("Test Country");
      expect(screen.getByLabelText("Description")).toHaveValue(
        "Test Description"
      );
      expect(screen.getByLabelText("Start Date")).toHaveValue("2022-01-01");
      expect(screen.getByLabelText("End Date")).toHaveValue("2022-01-02");
      expect(screen.getByLabelText("Category")).toHaveValue("Test Category");
      expect(screen.getByLabelText("Organizer Info")).toHaveValue(
        "Test Organizer"
      );
      expect(screen.getByLabelText("Type")).toHaveValue("Test Type");
      expect(screen.getByLabelText("Status")).toHaveValue("Test Status");
    });
  });

  test("Testing Edit Page fetching and displaying event data", async () => {
    axios.put.mockResolvedValue({ data: { message: "handle submit" } });
    const login = true;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    const subtButton = screen.getByText("Update");
    fireEvent.click(subtButton);
  });

  test("if any error occurs in saving data", async () => {
    axios.put.mockRejectedValue(new Error("Error Occured"));
    const login = true;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    const subtButton = screen.getByText("Update");
    fireEvent.click(subtButton);
  });

  test("Testing Edit Page is unauthenticated", async () => {
    const login = false;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    expect(window.location.pathname).toBe("/");
  });
});
