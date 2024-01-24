import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios"; // mock axios
import { UserAuth } from "../components";
import { List } from "../components";
import { BrowserRouter } from "react-router-dom";

const alertMock = jest.spyOn(window, "alert");
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

describe("useList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data and renders the component", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            name: "Event 1",
            status: "Active",
            description: "Description 1",
            category: "Category 1",
            organizerInfo: "Organizer 1",
            type: "Type 1",
          },
          {
            _id: "2",
            name: "Event 2",
            status: "Inactive",
            description: "Description 2",
            category: "Category 2",
            organizerInfo: "Organizer 2",
            type: "Type 2",
          },
        ],
        datalength: 2,
      },
    });
    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    await waitFor(() =>
      expect(screen.getAllByTestId("view-btn")).toHaveLength(2)
    );
  });

  it("if an unauthorized user try to fetches the data", async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 403 } });
    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </UserAuth.Provider>
    );
  });

  it("if an error occurs in fetching data", async () => {
    axios.get.mockRejectedValueOnce({ response: { status: 500 } });
    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </UserAuth.Provider>
    );
  });

  it("checking buttons action if successful", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            name: "Event 1",
            status: "Active",
            description: "Description 1",
            category: "Category 1",
            organizerInfo: "Organizer 1",
            type: "Type 1",
          },
        ],
        datalength: 1,
      },
    });

    axios.delete.mockResolvedValueOnce();

    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    await waitFor(() => {
      const viewButton = screen.getByTestId("view-btn");
      fireEvent.click(viewButton);
      expect(window.location.pathname).toBe("/view/1");
      const editButton = screen.getByTestId("edit-btn");
      fireEvent.click(editButton);
      expect(window.location.pathname).toBe("/edit/1");
      const deleteButton = screen.getByTestId("delete-btn");
      fireEvent.click(deleteButton);
      const okButton = screen.getByText("OK");
      fireEvent.click(okButton);
    });
  });

  it("checking delete button if user is unauthorized", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            name: "Event 1",
            status: "Active",
            description: "Description 1",
            category: "Category 1",
            organizerInfo: "Organizer 1",
            type: "Type 1",
          },
        ],
        datalength: 1,
      },
    });

    axios.delete.mockRejectedValueOnce({ response: { status: 403 } });

    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    await waitFor(() => {
      const deleteButton = screen.getByTestId("delete-btn");
      fireEvent.click(deleteButton);
      const okButton = screen.getByText("OK");
      fireEvent.click(okButton);
    });
  });

  it("checking delete button if an error occurs in deleting", async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            _id: "1",
            name: "Event 1",
            status: "Active",
            description: "Description 1",
            category: "Category 1",
            organizerInfo: "Organizer 1",
            type: "Type 1",
          },
        ],
        datalength: 1,
      },
    });

    axios.delete.mockRejectedValueOnce({ response: { status: 500 } });

    const mockUserAuthValue = {
      login: true,
      isAuthenticated: function () {
        return true;
      },
    };
    render(
      <UserAuth.Provider value={mockUserAuthValue}>
        <BrowserRouter>
          <List />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    await waitFor(() => {
      const deleteButton = screen.getByTestId("delete-btn");
      fireEvent.click(deleteButton);
      const okButton = screen.getByText("OK");
      fireEvent.click(okButton);
    });
  });
});
