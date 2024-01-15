import { View } from "../components";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
describe("Testing View  Page", () => {
  test("Testing if data is fetched successfully", async () => {
    const login = true;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <View />
        </BrowserRouter>
      </UserAuth.Provider>
    );
  });
  test("Testing if user is not authenticated", () => {
    const login = false;
    render(
      <UserAuth.Provider value={{ login }}>
        <BrowserRouter>
          <View />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(window.location.pathname).toBe("/");
  });
});
