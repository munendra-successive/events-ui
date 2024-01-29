import View from "../modules/events/View";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
    const mockData = {
      _id: "65ae0267d0dc76fce4e375ea",
      name: "Music Event - 7540",
      address: {
        street: "163 Main St.",
        city: "San Francisco",
        state: "IL",
        postalCode: "54836",
        country: "USA",
      },
      description: "A Theater event happening in the heart of Seattle.",
      startDate: "2024-02-26T18:30:00.000Z",
      endDate: "2024-12-01T00:00:00.000Z",
      category: "Comedy",
      organizerInfo: "Ticketmaster",
      type: "Game",
      status: "Tickets on sale",
    };

    axios.get.mockResolvedValue({ data: { data: [mockData] } });
    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Tickets on sale")).toBeInTheDocument();
      expect(
        screen.getByText("A Theater event happening in the heart of Seattle.")
      ).toBeInTheDocument();
      expect(screen.getByText("2024-02-26T18:30:00.000Z")).toBeInTheDocument();
      expect(screen.getByText("Music Event - 7540")).toBeInTheDocument();
    });
  });
  test("Testing if user is not authenticated", async () => {
    axios.get.mockRejectedValue({ response: { status: 403 } });
    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(
        screen.getByText("You are Unauthorized, Please Login")
      ).toBeInTheDocument();
      expect(window.location.pathname).toBe("/");
    });
  });

  test("Testing if an error occurs", async () => {
    axios.get.mockRejectedValue({ response: { status: 500 } });
    render(
      <BrowserRouter>
        <View />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.queryByText("Tickets on sale")).toBe(null);
    });
  });
});
