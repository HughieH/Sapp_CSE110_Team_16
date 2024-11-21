import { render, screen, fireEvent } from '@testing-library/react';
import EditDeck from './EditDeck';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('test edit deck page', () => {

    test('check if rename deck button renders and words', () => {
        render(
            <MemoryRouter>
                <EditDeck />
            </MemoryRouter>
        );
        const renameButton = screen.getByTestId('rename deck');
        expect(renameButton).toHaveTextContent('✏️');

        const promptMock = jest.spyOn(window, 'prompt').mockImplementation(() => 'Cool Deck');
        fireEvent.click(renameButton);
        const deckTitle = screen.getByText('Cool Deck');
        expect(deckTitle).toBeInTheDocument();
    });

    test('check if delete deck button renders', () => {
        render(
            <MemoryRouter>
                <EditDeck />
            </MemoryRouter>
        );
        const deleteDeck = screen.getByTestId('delete deck');
        expect(deleteDeck).toHaveTextContent('🗑️');
    });

    test('check if go back button renders', () => {
        render(
            <MemoryRouter initialEntries={['/edit-deck', '/decks']} initialIndex={0}>
                <Routes>
                    <Route path="/edit-deck" element={<EditDeck />} />
                    <Route path="/decks" element={<div>Your Decks</div>} />
                </Routes>
            </MemoryRouter>
        );
        const goBack = screen.getByTestId('back button');
        expect(goBack).toHaveTextContent('Go Back');
        fireEvent.click(goBack);
        const decksPage = screen.getByText('Your Decks');
        expect(decksPage).toBeInTheDocument();
    });

    test('check if adding/deleting a card works', () => {
        render(
            <MemoryRouter>
                <EditDeck />
            </MemoryRouter>
        );

        const createNewButton = screen.getByText('Create New');
        fireEvent.click(createNewButton);

        const frontText = screen.getByTestId('front-text');
        const backText = screen.getByTestId('back-text');

        fireEvent.change(frontText, { target: { value: 'What is a Stack?' } });
        fireEvent.change(backText, { target: { value: 'A Stack is a LIFO data structure.'} });

        expect(frontText).toHaveValue('What is a Stack?');
        expect(backText).toHaveValue('A Stack is a LIFO data structure.');

        const deleteButton = screen.getByTestId('delete-button');
        fireEvent.click(deleteButton);
        fireEvent.click(deleteButton);
        fireEvent.click(deleteButton);
        fireEvent.click(createNewButton);
        const frontText2 = screen.getByTestId('front-text');
        const backText2 = screen.getByTestId('back-text');
        expect(frontText2).not.toHaveValue('What is a Stack?');
        expect(backText2).not.toHaveValue('A Stack is a LIFO data structure.');
    });

});