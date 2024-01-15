import { Create } from "../components";
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
describe("Testing Create Page", () => {
  const login = true;
  test("Testing Create Page correctly rendering or not", () => {
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    const submtButton = screen.getByText("Save");
  });
  test("Testing form submission on Save button click if successful", async () => {
    axios.post.mockResolvedValue({
      data: { msg: "Event added Successfully" },
    });
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    const submtButton = screen.getByText("Save");
    fireEvent.click(submtButton);
  });

  test("Testing form submission on Save button click if not successful", async () => {
    axios.post.mockRejectedValue({
      data: { msg: new Error("Error Occured") },
    });
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    const submtButton = screen.getByText("Save");
    fireEvent.click(submtButton);
  });

  test("Testing Create Page if unauthenticate", () => {
    const login = false;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <Create />
        </BrowserRouter>
      </UserAuth.Provider>
    );
  });
});
