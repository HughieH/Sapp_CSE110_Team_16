import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../assets/icons/SappLogo.png', () => 'SappLogo.png');
jest.mock('../assets/icons/book-icon-homepage.png', () => 'book-icon-homepage.png');

describe('HomePage Component', () => {
  test('renders the SAPP title and book icon', () => {
    render(<BrowserRouter>
              <HomePage />
            </BrowserRouter>);
    // Check if the title "SAPP" is present
    const titleElement = screen.getByText(/SAPP/i);
    expect(titleElement).toBeInTheDocument();

  });

  test('renders the Log In and Create Account buttons', () => {
    render(<BrowserRouter>
            <HomePage />
          </BrowserRouter>);    
    
    // Check if "Log In" button is present
    const loginButton = screen.getByText(/Log In/i);
    expect(loginButton).toBeInTheDocument();

    // Check if "Create Account" button is present
    const createAccountButton = screen.getByText(/Create Account/i);
    expect(createAccountButton).toBeInTheDocument();
  });
});

describe('NavBar Component', () => {
  test('', () => {

  });
});
