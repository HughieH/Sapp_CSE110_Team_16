import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StudyDeck from './StudyDeck';

describe('test study deck page', () => {

    test('check if flip button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const flipButton = screen.getByTestId('flip button');
        expect(flipButton).toHaveTextContent('Flip Card');
    });

    test('check if wrong button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const wrongButton = screen.getByTestId('wrong button');
        expect(wrongButton).toHaveTextContent('Wrong');
    });

    test('check if correct button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const correctButton = screen.getByTestId('correct button');
        expect(correctButton).toHaveTextContent('Correct');
    });

    test('check if ignore button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const ignoreButton = screen.getByTestId('ignore button');
        expect(ignoreButton).toHaveTextContent('Ignore');
    });

    test('check if previous button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const prevButton = screen.getByTestId('prev button');
        expect(prevButton).toHaveTextContent('Previous');
    });

    test('check if next button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const nextButton = screen.getByTestId('next button');
        expect(nextButton).toHaveTextContent('Next');
    });

    test('check if go back button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const backButton = screen.getByTestId('back button');
        expect(backButton).toHaveTextContent('Go Back');
    });

});