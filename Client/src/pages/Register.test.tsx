import { render, fireEvent, screen } from '@testing-library/react';
import Register from './Register';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ /* mock auth object */ })),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('Register', () => {
  it('registers a new user successfully', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: '123', email: 'test@example.com' },
    });

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/register/i));

    // Check if the Firebase function was called with the correct parameters
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(), // auth instance
      'test@example.com', // email
      'password123' // password
    );
  });

  it('handles error during registration', async () => {
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Registration failed'));

    render(<Register />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByText(/register/i));

    expect(await screen.findByText('Registration failed')).toBeInTheDocument();
  });
});
