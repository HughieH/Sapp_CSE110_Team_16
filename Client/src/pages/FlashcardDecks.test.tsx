import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FlashcardDecks from './FlashcardDecks';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc, increment } from 'firebase/firestore';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';  // Import useNavigate here


// Mock Firebase functions
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  increment: jest.fn(),
}));

// Mock Auth Context
jest.mock('../context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

// Mock react-router-dom navigate
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('FlashcardDecks Component', () => {
  const mockUser = { uid: 'user1' };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({ currentUser: mockUser });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display loading state initially', () => {
    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should show message to log in if no user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ currentUser: null });
    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );
    expect(screen.getByText('Please log in to view your decks.')).toBeInTheDocument();
  });

  it('should fetch and display decks when user is logged in', async () => {
    const mockDecks = [
      { id: '1', name: 'Deck 1', cards: [{ id: '1a', frontContent: 'Front 1', backContent: 'Back 1' }] },
      { id: '2', name: 'Deck 2', cards: [{ id: '2a', frontContent: 'Front 2', backContent: 'Back 2' }] },
    ];

    (getDocs as jest.Mock).mockResolvedValue({
      docs: mockDecks.map(deck => ({
        id: deck.id,
        data: () => deck,
      })),
    });

    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Your Decks')).toBeInTheDocument();
      expect(screen.getByText('Deck 1')).toBeInTheDocument();
      expect(screen.getByText('Deck 2')).toBeInTheDocument();
    });
  });

  it('should handle study button click and update timesStudied', async () => {
    const mockDeck = { id: '1', name: 'Deck 1', cards: [{ id: '1a', frontContent: 'Front 1', backContent: 'Back 1' }] };

    (getDocs as jest.Mock).mockResolvedValue({
      docs: [{ id: mockDeck.id, data: () => mockDeck }],
    });
    (updateDoc as jest.Mock).mockResolvedValue({});

    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );

    const studyButton = screen.getByText('Study');
    fireEvent.click(studyButton);

    await waitFor(() => {
      expect(updateDoc).toHaveBeenCalledWith(doc(db, 'decks', mockDeck.id), {
        timesStudied: increment(1),
      });
      expect(mockNavigate).toHaveBeenCalledWith(`/study/${mockDeck.id}`);
    });
  });

  it('should handle create new deck button click and add a new deck', async () => {
    (addDoc as jest.Mock).mockResolvedValue({ id: 'newDeckId' });

    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );

    const createNewButton = screen.getByText('+');
    fireEvent.click(createNewButton);

    await waitFor(() => {
      expect(addDoc).toHaveBeenCalled();
      expect(screen.getByText('Deck 1')).toBeInTheDocument();
    });
  });

  it('should handle edit deck button click and navigate to edit page', () => {
    const mockDeck = { id: '1', name: 'Deck 1', cards: [] };

    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/edit/${mockDeck.id}`);
  });

  it('should render the Create New Deck placeholder', () => {
    render(
      <Router>
        <FlashcardDecks />
      </Router>
    );

    expect(screen.getByText('Create New')).toBeInTheDocument();
    expect(screen.getByText('+')).toBeInTheDocument();
  });
});
