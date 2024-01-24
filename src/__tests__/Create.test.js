import { Edit } from "../components";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  queryByText,
} from "@testing-library/react";
import { BrowserRouter, useParams } from "react-router-dom";
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
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: "create" }), // Mock useParams to return a specific id
}));

jest.mock("axios");
const alertMock = jest.spyOn(window, "alert");

describe("Testing for  Edit functionality", () => {
  test("Testing Edit Page correctly rendering or not", () => {
    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  // Updating event data correctly submits the form
  test("Submitting an event data an if it is successful", async () => {
    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };

    axios.post.mockResolvedValue({ data: { msg: "Event added Successfully" } });
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    fireEvent.change(screen.getByLabelText("Event Name"), {
      target: { value: "Updated Event Name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: { value: "Updated Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Updated City" },
    });
    fireEvent.change(screen.getByPlaceholderText("State"), {
      target: { value: "Updated State" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country"), {
      target: { value: "Updated Country" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated Event Description" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Updated Category" },
    });
    fireEvent.change(screen.getByLabelText("Organizer Info"), {
      target: { value: "Organizer Info" },
    });
    fireEvent.change(screen.getByLabelText("Type"), {
      target: { value: "Event Type" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "Updated Status" },
    });
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("record added successfully");
    });
  });

  test("Submitting an event data an if user is unauthenticated", async () => {
    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };

    axios.post.mockRejectedValue({ response: { status: 403 } });
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    fireEvent.change(screen.getByLabelText("Event Name"), {
      target: { value: "Updated Event Name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: { value: "Updated Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Updated City" },
    });
    fireEvent.change(screen.getByPlaceholderText("State"), {
      target: { value: "Updated State" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country"), {
      target: { value: "Updated Country" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated Event Description" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Updated Category" },
    });
    fireEvent.change(screen.getByLabelText("Organizer Info"), {
      target: { value: "Organizer Info" },
    });
    fireEvent.change(screen.getByLabelText("Type"), {
      target: { value: "Event Type" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "Updated Status" },
    });
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Error Occured");
    });
  });

  test("Submitting an event data an if an error occurs", async () => {
    const login = true;

    axios.post.mockRejectedValue({ response: { status: 500 } });
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Edit />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    fireEvent.change(screen.getByLabelText("Event Name"), {
      target: { value: "Updated Event Name" },
    });
    fireEvent.change(screen.getByPlaceholderText("Street"), {
      target: { value: "Updated Street" },
    });
    fireEvent.change(screen.getByPlaceholderText("City"), {
      target: { value: "Updated City" },
    });
    fireEvent.change(screen.getByPlaceholderText("State"), {
      target: { value: "Updated State" },
    });
    fireEvent.change(screen.getByPlaceholderText("Postal Code"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByPlaceholderText("Country"), {
      target: { value: "Updated Country" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated Event Description" },
    });

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Updated Category" },
    });
    fireEvent.change(screen.getByLabelText("Organizer Info"), {
      target: { value: "Organizer Info" },
    });
    fireEvent.change(screen.getByLabelText("Type"), {
      target: { value: "Event Type" },
    });
    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "Updated Status" },
    });
    fireEvent.click(screen.getByText("Save"));
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Error Occured");
    });
  });
});
