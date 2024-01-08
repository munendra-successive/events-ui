import React from "react";
import App from "../App";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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
describe("App component", () => {
  test("renders without crashing", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    const passInput = screen.getByLabelText("Password");
    expect(passInput).toBeInTheDocument();
    fireEvent.change(emailInput, { target: { value: "monu@gmail.com" } });
    fireEvent.change(passInput, { target: { value: "MOnu@123" } });
    fireEvent.click(loginButton)
    expect(screen.getByText("")).toBeInTheDocument()
  });
});
