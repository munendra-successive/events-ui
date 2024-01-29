import Edit from "../modules/events/Create-Edit";
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
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "123" }),
}));

jest.mock("axios");
const alertMock = jest.spyOn(window, "alert");
describe("Testing for  Edit functionality", () => {
  test("Testing Edit Page fetches data correctly", async () => {
    const mockResponse = {
      data: {
        data: [
          {
            name: "Event Name",
            address: {
              street: "Street",
              city: "City",
              state: "State",
              postalCode: "Postal Code",
              country: "Country",
            },
            description: "Event Description",
            startDate: "2022-01-01",
            endDate: "2022-01-02",
            category: "Event Category",
            organizerInfo: "Organizer Info",
            type: "Event Type",
            status: "Event Status",
          },
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);
    render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByLabelText("Event Name")).toHaveValue("Event Name");
      expect(screen.getByPlaceholderText("Street")).toHaveValue("Street");
      expect(screen.getByPlaceholderText("City")).toHaveValue("City");
      expect(screen.getByPlaceholderText("State")).toHaveValue("State");
      expect(screen.getByPlaceholderText("Postal Code")).toHaveValue(
        "Postal Code"
      );
      expect(screen.getByPlaceholderText("Country")).toHaveValue("Country");
      expect(screen.getByLabelText("Description")).toHaveValue(
        "Event Description"
      );
      expect(screen.getByLabelText("Start Date")).toHaveValue("2022-01-01");
      expect(screen.getByLabelText("End Date")).toHaveValue("2022-01-02");
      expect(screen.getByLabelText("Category")).toHaveValue("Event Category");
      expect(screen.getByLabelText("Organizer Info")).toHaveValue(
        "Organizer Info"
      );
      expect(screen.getByLabelText("Type")).toHaveValue("Event Type");
      expect(screen.getByLabelText("Status")).toHaveValue("Event Status");
    });
  });

  test("Testing Edit Page fetches data if user is unautheticated", async () => {
    axios.get.mockRejectedValue({ response: { status: 403 } });
    render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("Testing Edit Page fetches data if error occurs", async () => {
    axios.get.mockRejectedValue({ response: { status: 500 } });
    render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });

  test("Submitting updated event data and if successful", async () => {
    const mockData = {
      _id: "123",
      name: "Event Name",
      address: {
        street: "Street",
        city: "City",
        state: "State",
        postalCode: "Postal Code",
        country: "Country",
      },
      description: "Event Description Description",
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      category: "Event Category",
      organizerInfo: "Organizer Info",
      type: "Event Type",
      status: "Event Status",
    };
    axios.get.mockResolvedValue({ data: { data: [mockData] } });
    const mockResponse = {
      data: {
        success: true,
      },
    };
    axios.put.mockResolvedValue({ data: { mockResponse } });
    render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByLabelText("Event Name")).toHaveValue("Event Name");
      expect(screen.getByPlaceholderText("Street")).toHaveValue("Street");
      expect(screen.getByPlaceholderText("City")).toHaveValue("City");
      expect(screen.getByPlaceholderText("State")).toHaveValue("State");
      expect(screen.getByPlaceholderText("Postal Code")).toHaveValue(
        "Postal Code"
      );
      expect(screen.getByPlaceholderText("Country")).toHaveValue("Country");
    });

    await waitFor(() => {
      const sbtn = screen.getByText("Save");
      expect(sbtn).toBeInTheDocument();
      fireEvent.click(sbtn);
      expect(alertMock).toHaveBeenCalledWith("record updated successfully");
    });
  });

  test("Submitting updated event data and if user is unauthenticated", async () => {
    const mockData = {
      _id: "123",
      name: "Event Name",
      address: {
        street: "Street",
        city: "City",
        state: "State",
        postalCode: "Postal Code",
        country: "Country",
      },
      description: "Event Description Description",
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      category: "Event Category",
      organizerInfo: "Organizer Info",
      type: "Event Type",
      status: "Event Status",
    };
    axios.get.mockResolvedValue({ data: { data: [mockData] } });
    axios.put.mockRejectedValue({ response: { status: 403 } });
    render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByLabelText("Event Name")).toHaveValue("Event Name");
    });
    const sbtn = screen.getByText("Save");
    fireEvent.click(sbtn);

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Error Occured");
    });
  });

  test("Submitting updated event data and if error occurs", async () => {
    const mockData = {
      _id: "123",
      name: "Event Name",
      address: {
        street: "Street",
        city: "City",
        state: "State",
        postalCode: "Postal Code",
        country: "Country",
      },
      description: "Event Description Description",
      startDate: "2022-01-01",
      endDate: "2022-01-02",
      category: "Event Category",
      organizerInfo: "Organizer Info",
      type: "Event Type",
      status: "Event Status",
    };
    axios.get.mockResolvedValue({ data: { data: [mockData] } });

    const mockResponse = {
      data: {
        success: true,
      },
    };
    axios.put.mockRejectedValue({ response: { status: 500 } });
    render(
      <BrowserRouter>
        <Edit />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByLabelText("Event Name")).toHaveValue("Event Name");
    });
    const sbtn = screen.getByText("Save");
    fireEvent.click(sbtn);
  });
});
