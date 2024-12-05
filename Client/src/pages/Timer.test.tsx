import React from "react";
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For additional matchers
import Timer from "./Timer"; // Adjust the path based on your project structure

describe("Timer Component", () => {
  test("renders initial text for 'Study! Lock in >:)'", () => {
    render(<MemoryRouter>
            <Timer />
          </MemoryRouter>);    
    expect(screen.getByText(/Study! Lock in >:\)/i)).toBeInTheDocument();
  });

  test("renders 'Studying...' text when timer is running", () => {
    render(<MemoryRouter>
              <Timer />
            </MemoryRouter>);    
    const startButton = screen.getByText(/Start/i);
    fireEvent.click(startButton); // Start the timer
    expect(screen.getByText(/Studying.../i)).toBeInTheDocument();
  });

  test("renders the 'Finish' button", () => {
    render(<MemoryRouter>
            <Timer />
          </MemoryRouter>);    
    expect(screen.getByText(/Finish/i)).toBeInTheDocument();
  });
});
