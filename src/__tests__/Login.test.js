import { Login } from "../components";
import React, { useState } from "react";
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
const navigate = jest.fn();
describe("Testing Login Page", () => {
  const login = true;
  const setLogin = jest.fn();
  test("Testing Login Page correctly rendering or not", () => {
    render(
      <UserAuth.Provider value={{ setLogin }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  test("Testing Login Page displays error message on unsuccessful login", async () => {
    const errorMessage = "Invalid credentials";
    axios.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    render(
      <UserAuth.Provider value={{ setLogin }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserAuth.Provider>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Log In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid Credentials")).toBeInTheDocument();
    });
  });
});
