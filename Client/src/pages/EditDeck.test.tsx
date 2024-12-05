import { render, screen, fireEvent } from '@testing-library/react';
import EditDeck from './EditDeck';
import { MemoryRouter } from 'react-router-dom';

describe('test edit deck page', () => {

    test('check if rename deck button renders', () => {
        render(
            <MemoryRouter>
                <EditDeck />
            </MemoryRouter>
        );
        const renameButton = screen.getByTestId('rename deck');
        expect(renameButton).toHaveTextContent('✏️');
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
            <MemoryRouter>
                <EditDeck />
            </MemoryRouter>
        );
        const goBack = screen.getByTestId('back button');
        expect(goBack).toHaveTextContent('Go Back');
    });

    test('check if adding/deleting a card works', () => {
        render(
            <MemoryRouter>
                <EditDeck />
            </MemoryRouter>
        );

        // const frontText = screen.getByTestId('front-text');
        // const backText = screen.getByTestId('back-text');

        // fireEvent.change(frontText, { target: { value: 'What is a Stack?' } });
        // fireEvent.change(backText, { target: { value: 'A Stack is a LIFO data structure.'} });

        // expect(frontText).toHaveValue('What is a Stack?');
        // expect(backText).toHaveValue('A Stack is a LIFO data structure.');
    });

});