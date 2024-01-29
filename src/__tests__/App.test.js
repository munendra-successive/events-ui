import React, { lazy, Suspense } from "react";
import { Skeleton } from "antd";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
const App = lazy(() => import("../App"));
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
  test("renders without crashing", async () => {
    await act(async () => {
      render(
        <Suspense fallback={<Skeleton />}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Suspense>
      );
    });

    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    const passInput = screen.getByLabelText("Password");
    expect(passInput).toBeInTheDocument();
  });
});
