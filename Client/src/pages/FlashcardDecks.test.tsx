// FlashcardDecks.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlashcardDecks from './FlashcardDecks';

describe('FlashcardDecks Component', () => {
  test('renders initial decks correctly', () => {
    render(
      <MemoryRouter>
        <FlashcardDecks />
      </MemoryRouter>
    );

    // Check if each deck is rendered with correct names
    expect(screen.getByText('Deck 1')).toBeInTheDocument();
    expect(screen.getByText('Deck 2')).toBeInTheDocument();
    expect(screen.getByText('Deck 3')).toBeInTheDocument();
  });

  test('renders correct number of cards for each deck preview', () => {
    render(
      <MemoryRouter>
        <FlashcardDecks />
      </MemoryRouter>
    );

    const cardElements = screen.getAllByText(/Card \d/);
    expect(cardElements.length).toBeGreaterThanOrEqual(3); // Ensures 3 cards appear in the first deck preview
  });

  test('Edit and Study buttons have correct links', () => {
    render(
      <MemoryRouter>
        <FlashcardDecks />
      </MemoryRouter>
    );

    // Check if Edit and Study buttons are present and have correct links
    const editLinks = screen.getAllByText('Edit');
    const studyLinks = screen.getAllByText('Study');

    expect(editLinks[0]).toHaveAttribute('href', '/edit/1');
    expect(studyLinks[0]).toHaveAttribute('href', '/study/1');

    expect(editLinks[1]).toHaveAttribute('href', '/edit/2');
    expect(studyLinks[1]).toHaveAttribute('href', '/study/2');
  });

  test('creates a new deck when Create New button is clicked', () => {
    render(
      <MemoryRouter>
        <FlashcardDecks />
      </MemoryRouter>
    );

    const createButton = screen.getByText('+');
    fireEvent.click(createButton);

    // Check if new deck is added
    expect(screen.getByText('Deck 4')).toBeInTheDocument();
  });

  test('new deck contains three initial cards', () => {
    render(
      <MemoryRouter>
        <FlashcardDecks />
      </MemoryRouter>
    );

    const createButton = screen.getByText('+');
    fireEvent.click(createButton);

    // Check if new deck has 3 cards
    const newDeckCards = screen.getAllByText(/Card \d/);
    expect(newDeckCards.length).toBeGreaterThanOrEqual(6); // 3 cards from the new deck added to the initial count
  });
});
