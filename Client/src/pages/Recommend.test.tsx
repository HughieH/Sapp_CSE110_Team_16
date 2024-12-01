import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Recommend from './Recommend';
import '@testing-library/jest-dom';

jest.useFakeTimers(); 

describe('Recommend Component', () => {
  it('renders the "Insert Coin" button initially', () => {
    render(<Recommend />);
    expect(screen.getByText('Insert Coin')).toBeInTheDocument();
  });

  it('shows claw and selects a strategy when "Insert Coin" is clicked', async () => {
    render(<Recommend />);

    fireEvent.click(screen.getByText('Insert Coin'));


    jest.advanceTimersByTime(3000);


    await waitFor(() =>
      expect(
        screen.getByText(/Active Recall|Pomodoro Technique|Spaced Repetition|Mind Mapping|Feynman Technique/)
      ).toBeInTheDocument()
    );
  });

  it('displays the "Reinsert Coin" button after a strategy is shown', async () => {
    render(<Recommend />);

    fireEvent.click(screen.getByText('Insert Coin'));

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByText('Reinsert Coin')).toBeInTheDocument();
    });
  });

  it('resets and selects a new strategy when "Reinsert Coin" is clicked', async () => {
    render(<Recommend />);

    fireEvent.click(screen.getByText('Insert Coin'));
    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(screen.getByText('Reinsert Coin')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Reinsert Coin'));

    jest.advanceTimersByTime(3000);

    await waitFor(() => {
      expect(
        screen.getByText(/Active Recall|Pomodoro Technique|Spaced Repetition|Mind Mapping|Feynman Technique/)
      ).toBeInTheDocument();
    });
  });
});
