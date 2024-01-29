import { Login } from "../modules";
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

jest.mock("axios");
const navigate = jest.fn();
describe("Testing Login Page", () => {
  test("Testing Login Page correctly rendering or not", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  test("Testing Login Page for successful login", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Login Successful" },
    });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
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

  test("Testing Login Page  if invalid credentials provided", async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 401,
      },
    });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const loginButton = screen.getByText("Log In");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);
  });

  test("Testing Login Page  if error occurs", async () => {
    axios.post.mockRejectedValue({
      response: {
        status: 500,
      },
    });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
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
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signUpButton = screen.getByText("Sign Up");
    fireEvent.click(signUpButton);
    expect(window.location.pathname).toBe("/register");
  });
});
