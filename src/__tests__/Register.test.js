import Register from "../modules/user/Register";
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

describe("Testing Register Page", () => {
  test("Successful user registration with valid data", async () => {
    axios.post.mockResolvedValue({
      data: { message: "Registered Successfully" },
    });
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const addressInput = screen.getByLabelText("Address");
    const phoneInput = screen.getByLabelText("Phone");
    const registerButton = screen.getByText("Register");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(screen.getByText("Registered Successfully")).toBeInTheDocument();
    });
  });

  test("if user already exist", async () => {
    axios.post.mockRejectedValue({
      response: { data: { message: "User already exist" } },
    });
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const addressInput = screen.getByLabelText("Address");
    const phoneInput = screen.getByLabelText("Phone");
    const registerButton = screen.getByText("Register");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(registerButton);
    await waitFor(() => {
      expect(screen.getByText("User already exist")).toBeInTheDocument();
    });
  });

  test(" if an error occurs", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { message: "Error Occured" },
      },
    });
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const addressInput = screen.getByLabelText("Address");
    const phoneInput = screen.getByLabelText("Phone");
    const registerButton = screen.getByText("Register");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.click(registerButton);
  });
});
