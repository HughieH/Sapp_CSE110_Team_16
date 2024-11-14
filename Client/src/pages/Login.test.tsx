// src/pages/Login.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
    it('renders login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        // Check for "Log in" header text
        expect(screen.getByRole('heading', { name: /Log in/i })).toBeInTheDocument();

        // Check for email input field
        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();

        // Check for password input field
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

        // Check for the log-in button
        expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();

        // Check for "Create Account" link
        expect(screen.getByText(/Create Account/i)).toBeInTheDocument();

        // Check for "Forgot Password?" link
        expect(screen.getByText(/Forgot Passward/i)).toBeInTheDocument();
    });
});
