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

  test("Testing Login Page for successful login", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Login Successful" }
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

    waitFor(() => {
      expect(screen.getByText("Login Successful")).toBeInTheDocument();
    });
  });

  test("Testing Login Page displays error message on unsuccessful login", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Invalid Credentials" },
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
    waitFor(() => {
      expect(screen.getByText("Invalid Credentials")).toBeInTheDocument();
    });
  });

  test("Testing Login Page  if an error occurs", async () => {
    axios.post.mockRejectedValue({
      data: { message: "Invalid Credentials" },
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
  });

  test("Testing if redirects on register page or not", async () => {
    axios.post.mockRejectedValue({
      data: { message: "Invalid Credentials" },
    });
    render(
      <UserAuth.Provider value={{ setLogin }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </UserAuth.Provider>
    );
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    expect(window.location.pathname).toBe("/register");
  });
});
