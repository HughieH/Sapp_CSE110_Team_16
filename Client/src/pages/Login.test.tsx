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

        expect(screen.getByRole('heading', { name: /Log in/i })).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();

        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

        expect(screen.getByTestId('email-login-button')).toBeInTheDocument();

        expect(screen.getByTestId('google-login-button')).toBeInTheDocument();

        expect(screen.getByText(/Create Account/i)).toBeInTheDocument();

        expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    });
});
