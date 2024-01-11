import { Register } from "../components";
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

describe("Testing Register Page", () => {
  const customTextMatcher = (content, element) => {
    return element.textContent.includes(content);
  };

  test("Testing Register Page correctly rendering or not", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByText("User Registration")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });
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
    console.log("confirm::::::::::::::", confirmPasswordInput)

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("Registered Successfully")).toBeInTheDocument();
    });
  });
  test("if user already exist", async () => {
    axios.post.mockResolvedValue({
      data: { message: "User already exist" },
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

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("User already exist")).toBeInTheDocument();
    });
  });
  test.only("if user already exist 1", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("Please input your name!")).toBeInTheDocument();
      expect(screen.getByText("Please enter your email!")).toBeInTheDocument();
      expect(screen.getByText("Please input your password!")).toBeInTheDocument();
    });
  });
  test("if user already exist", async () => {
    axios.post.mockRejectedValue({
      data: { message: "User already exist" },
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
    console.log("confirm::::::::::::::", confirmPasswordInput)
    confirmPasswordInput.rules;
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password--" } });

    fireEvent.change(addressInput, { target: { value: "123 Main St" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });

    fireEvent.click(screen.getByText("Register"));
  });
});

