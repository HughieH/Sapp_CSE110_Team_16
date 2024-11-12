import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

jest.mock('../assets/SappLogo.png', () => 'SappLogo.png');
jest.mock('../assets/book-icon-homepage.png', () => 'book-icon-homepage.png');

describe('HomePage Component', () => {
  test('renders the SAPP title and book icon', () => {
    render(<HomePage />);
    
    // Check if the title "SAPP" is present
    const titleElement = screen.getByText(/SAPP/i);
    expect(titleElement).toBeInTheDocument();

  });

  test('renders the Log In and Create Account buttons', () => {
    render(<HomePage />);
    
    // Check if "Log In" button is present
    const loginButton = screen.getByText(/Log In/i);
    expect(loginButton).toBeInTheDocument();

    // Check if "Create Account" button is present
    const createAccountButton = screen.getByText(/Create Account/i);
    expect(createAccountButton).toBeInTheDocument();
  });
});