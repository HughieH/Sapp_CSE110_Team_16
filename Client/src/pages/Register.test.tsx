// src/pages/Register.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

describe('Register Component', () => {
    it('renders registration form', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        // Check for "Create Account" header text
        expect(screen.getByText(/Create Account/i)).toBeInTheDocument();

        // Check for email input field
        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();

        // Check for password input field
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

        // Check for the sign-up button
        expect(screen.getByRole('button', { name: /Sign up with email/i })).toBeInTheDocument();

        // Check for "Already signed up? Go to Login" link
        expect(screen.getByText((content, element) => {
            return content.startsWith('Already signed up') && (element!.tagName.toLowerCase() === 'div');
        })).toBeInTheDocument();
    });
});
