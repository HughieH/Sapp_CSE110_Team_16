import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditDeck from './EditDeck';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { getDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { BrowserRouter as Router, Route, Routes, useNavigate, useParams } from 'react-router-dom';

// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  deleteDoc: jest.fn(),
}));

// Mock Auth Context
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock react-router-dom navigate and useParams
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
  Link: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockUser = { uid: 'user1' };

describe('EditDeck Component', () => {
  const mockDeck = {
    name: 'Test Deck',
    cards: [
      { id: 1, frontContent: 'Front 1', backContent: 'Back 1', numCorrect: 0 },
      { id: 2, frontContent: 'Front 2', backContent: 'Back 2', numCorrect: 0 },
    ],
    userId: 'user1',
  };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ currentUser: mockUser });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useParams as jest.Mock).mockReturnValue({ deckId: '1' });
    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      data: () => mockDeck,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display deck name and flashcards after loading data', async () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Deck')).toBeInTheDocument();
      expect(screen.getByText('Front 1')).toBeInTheDocument();
      expect(screen.getByText('Back 1')).toBeInTheDocument();
    });
  });

  it('should allow editing deck name', async () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );

    fireEvent.click(screen.getByTestId('rename deck'));

    const newDeckName = 'Updated Deck Name';
    window.prompt = jest.fn().mockReturnValue(newDeckName);
    fireEvent.click(screen.getByTestId('rename deck'));

    await waitFor(() => {
      expect(screen.getByText(newDeckName)).toBeInTheDocument();
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
        name: newDeckName,
        cards: mockDeck.cards,
        userId: mockUser.uid,
      });
    });
  });

  it('should allow editing front and back content of flashcards', async () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );

    const frontTextarea = screen.getAllByTestId('front-text')[0];
    const backTextarea = screen.getAllByTestId('back-text')[0];

    fireEvent.change(frontTextarea, { target: { value: 'Updated Front Content' } });
    fireEvent.change(backTextarea, { target: { value: 'Updated Back Content' } });

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
        name: mockDeck.name,
        cards: [
          { ...mockDeck.cards[0], frontContent: 'Updated Front Content', backContent: 'Updated Back Content' },
          mockDeck.cards[1],
        ],
        userId: mockUser.uid,
      });
    });
  });

  it('should allow deleting a card', async () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );

    const deleteButton = screen.getAllByText('🗑️ Delete')[0];
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(setDoc).toHaveBeenCalledWith(expect.anything(), {
        name: mockDeck.name,
        cards: [mockDeck.cards[1]], // After deleting the first card
        userId: mockUser.uid,
      });
    });
  });

  it('should allow adding a new card', async () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );

    const addCardButton = screen.getByText('Create New');
    fireEvent.click(addCardButton);

    await waitFor(() => {
      expect(screen.getAllByTestId('front-text')).toHaveLength(3); // One new card is added
    });
  });

  it('should allow deleting the deck', async () => {
    window.confirm = jest.fn().mockReturnValue(true); // Simulate user confirmation

    render(
      <Router>
        <EditDeck />
      </Router>
    );

    const deleteDeckButton = screen.getByTestId('delete deck');
    fireEvent.click(deleteDeckButton);

    await waitFor(() => {
      expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'decks', '1'));
      expect(mockNavigate).toHaveBeenCalledWith('/decks');
    });
  });

  it('should navigate back to decks list when clicking "Go Back"', () => {
    render(
      <Router>
        <EditDeck />
      </Router>
    );

    const goBackButton = screen.getByTestId('back button');
    fireEvent.click(goBackButton);

    expect(mockNavigate).toHaveBeenCalledWith('/decks');
  });
});
