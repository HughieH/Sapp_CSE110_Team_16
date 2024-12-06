import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';
import StudyDeck from './StudyDeck';
import { db } from '../firebaseConfig';
import { AuthProvider } from '../context/AuthContext';

// Mock Firebase methods
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

const mockNavigate = jest.fn();

// Wrap the component with necessary context and routing
const Wrapper: React.FC = () => (
  <AuthProvider>
    <MemoryRouter initialEntries={['/study-deck/1']}>
      <Routes>
        <Route path="/study-deck/:deckId" element={<StudyDeck />} />
      </Routes>
    </MemoryRouter>
  </AuthProvider>
);

describe('StudyDeck', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the deck name and first card', async () => {
    // Mock deck data
    const deckData = {
      name: 'Test Deck',
      cards: [
        { id: '1', frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 0 },
        { id: '2', frontContent: 'Front 2', backContent: 'Back 2', numCorrect: 0 },
      ],
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => deckData,
    });

    render(<Wrapper />);

    await waitFor(() => expect(screen.getByText('Test Deck')).toBeInTheDocument());
    expect(screen.getByText('Front 1')).toBeInTheDocument();
  });

  test('handles card flip correctly', async () => {
    const deckData = {
      name: 'Test Deck',
      cards: [
        { id: '1', frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 0 },
      ],
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => deckData,
    });

    render(<Wrapper />);

    await waitFor(() => expect(screen.getByText('Test Deck')).toBeInTheDocument());

    // Initially, show the front of the card
    expect(screen.getByText('Front 1')).toBeInTheDocument();

    // Click to flip the card
    fireEvent.click(screen.getByText('Front 1'));
    await waitFor(() => expect(screen.getByText('Back 1')).toBeInTheDocument());
  });

  test('increments correct and incorrect counts on answer', async () => {
    const deckData = {
      name: 'Test Deck',
      cards: [
        { id: '1', frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 0 },
      ],
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => deckData,
    });

    render(<Wrapper />);

    await waitFor(() => expect(screen.getByText('Test Deck')).toBeInTheDocument());

    // Click the "Correct" button
    fireEvent.click(screen.getByText('Correct'));

    await waitFor(() => expect(screen.getByText('Correct: 1')).toBeInTheDocument());
    expect(screen.getByText('Incorrect: 0')).toBeInTheDocument();

    // Click the "Wrong" button
    fireEvent.click(screen.getByText('Wrong'));

    await waitFor(() => expect(screen.getByText('Incorrect: 1')).toBeInTheDocument());
    expect(screen.getByText('Correct: 1')).toBeInTheDocument();
  });

  test('shuffles the deck when shuffle button is clicked', async () => {
    const deckData = {
      name: 'Test Deck',
      cards: [
        { id: '1', frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 0 },
        { id: '2', frontContent: 'Front 2', backContent: 'Back 2', numCorrect: 0 },
      ],
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => deckData,
    });

    render(<Wrapper />);

    await waitFor(() => expect(screen.getByText('Test Deck')).toBeInTheDocument());

    // Click the shuffle button
    fireEvent.click(screen.getByText('Shuffle Cards'));

    // Verify that shuffle was called
    expect(getDoc).toHaveBeenCalledTimes(1);
  });

  test('handles completion of deck study and success rate display', async () => {
    const deckData = {
      name: 'Test Deck',
      cards: [
        { id: '1', frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 1 },
        { id: '2', frontContent: 'Front 2', backContent: 'Back 2', numCorrect: 0 },
      ],
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => deckData,
    });

    render(<Wrapper />);

    await waitFor(() => expect(screen.getByText('Test Deck')).toBeInTheDocument());

    // Answer all cards
    fireEvent.click(screen.getByText('Correct'));
    fireEvent.click(screen.getByText('Correct'));

    // Completion screen should appear
    await waitFor(() => expect(screen.getByText('You’ve finished studying the deck!')).toBeInTheDocument());
    expect(screen.getByText('Success Rate: 50%')).toBeInTheDocument();
  });

  test('resets study when Restudy Deck button is clicked', async () => {
    const deckData = {
      name: 'Test Deck',
      cards: [
        { id: '1', frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 1 },
        { id: '2', frontContent: 'Front 2', backContent: 'Back 2', numCorrect: 0 },
      ],
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => deckData,
    });

    render(<Wrapper />);

    await waitFor(() => expect(screen.getByText('Test Deck')).toBeInTheDocument());

    // Answer the first card
    fireEvent.click(screen.getByText('Correct'));

    // Completion screen appears
    fireEvent.click(screen.getByText('Restudy Deck'));

    // Verify that stats are reset
    await waitFor(() => expect(screen.getByText('Correct: 0')).toBeInTheDocument());
    expect(screen.getByText('Incorrect: 0')).toBeInTheDocument();
  });
});
