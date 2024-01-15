import { List } from "../components";
import React from "react";
import { render, screen, fireEvent, queryByText } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UserAuth } from "../components";
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

describe("Testing List Page", () => {
  test("Testing List Page correctly rendering or not", () => {
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
    expect(screen.getByText("List")).toBeInTheDocument();
    expect(screen.getByText("Bulk Listing")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByText("Create")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
    expect(screen.getByText("Upload Csv")).toBeInTheDocument();
  });

  test("Testing  Buttons ", () => {
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
    const createButtton = screen.getByText("Create");
    fireEvent.click(createButtton);
    expect(window.location.pathname).toBe("/create");
    const uploadCsvButton = screen.getByText("Upload Csv");
    fireEvent.click(uploadCsvButton);
    expect(window.location.pathname).toBe("/bulkUpload");
  });

  test("Testing  if list route is authenticated or not ", () => {
    const mockUserAuthValue = {
      login: false,
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

  test("Testing  Serach Bar", () => {
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
    const searchBar = screen.getByPlaceholderText("Search");
    fireEvent.change(searchBar, { target: { value: "music" } });
    fireEvent.keyDown(searchBar, { key: "Enter", code: "Enter" });
  });

  // test("Testing  Filter Options", () => {
  //   const mockUserAuthValue = {
  //     login: true,
  //     isAuthenticated: function () {
  //       return true;
  //     },
  //   };
  //   render(
  //     <UserAuth.Provider value={mockUserAuthValue}>
  //       <BrowserRouter>
  //         <List />
  //       </BrowserRouter>
  //     </UserAuth.Provider>
  //   );
  //   const filterInput = screen.getByTestId("view");
  //   expect(filterInput).toBeInTheDocument();
  // });
});
