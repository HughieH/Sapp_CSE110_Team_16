import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StudyDeck from './StudyDeck';

describe('test study deck page', () => {

    test('check if flip button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const flipButton = screen.getByTestId('flip button');
        expect(flipButton).toHaveTextContent('Flip Card');
    });

    test('check if wrong button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const wrongButton = screen.getByTestId('wrong button');
        expect(wrongButton).toHaveTextContent('Wrong');
    });

    test('check if correct button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const correctButton = screen.getByTestId('correct button');
        expect(correctButton).toHaveTextContent('Correct');
    });

    test('check if ignore button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const ignoreButton = screen.getByTestId('ignore button');
        expect(ignoreButton).toHaveTextContent('Ignore');
    });

    test('check if previous button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const prevButton = screen.getByTestId('prev button');
        expect(prevButton).toHaveTextContent('Previous');
    });

    test('check if next button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const nextButton = screen.getByTestId('next button');
        expect(nextButton).toHaveTextContent('Next');
    });

    test('check if go back button renders', () => {
        render(<BrowserRouter>
                <StudyDeck />
               </BrowserRouter>);
        const backButton = screen.getByTestId('back button');
        expect(backButton).toHaveTextContent('Go Back');
    });

});