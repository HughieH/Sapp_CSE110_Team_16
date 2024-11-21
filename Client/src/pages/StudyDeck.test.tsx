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

    test('check if wrong button renders and works', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const wrongButton = screen.getByTestId('wrong button');
        expect(wrongButton).toHaveTextContent('Wrong');

        const cardContent1 = screen.getByText('Front 1');
        expect(cardContent1).toBeInTheDocument();

        fireEvent.click(wrongButton);
        const cardContent2 = screen.getByText('Front 2');
        expect(cardContent2).toBeInTheDocument();

        fireEvent.click(wrongButton);
        const cardContent3 = screen.getByText('Front 3');
        expect(cardContent3).toBeInTheDocument();
    });

    test('check if correct button renders and works', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const correctButton = screen.getByTestId('correct button');
        expect(correctButton).toHaveTextContent('Correct');

        const cardContent1 = screen.getByText('Front 1');
        expect(cardContent1).toBeInTheDocument();

        fireEvent.click(correctButton);
        const cardContent2 = screen.getByText('Front 2');
        expect(cardContent2).toBeInTheDocument();

        fireEvent.click(correctButton);
        const cardContent3 = screen.getByText('Front 3');
        expect(cardContent3).toBeInTheDocument();
    });

    test('check if ignore button renders and works', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const ignoreButton = screen.getByTestId('ignore button');
        expect(ignoreButton).toHaveTextContent('Ignore');

        const cardContent1 = screen.getByText('Front 1');
        expect(cardContent1).toBeInTheDocument();

        fireEvent.click(ignoreButton);
        const cardContent2 = screen.getByText('Front 2');
        expect(cardContent2).toBeInTheDocument();

        fireEvent.click(ignoreButton);
        const cardContent3 = screen.getByText('Front 3');
        expect(cardContent3).toBeInTheDocument();
    });

    test('check if previous button renders and works', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const prevButton = screen.getByTestId('prev button');
        expect(prevButton).toHaveTextContent('Previous');

        const correctButton = screen.getByTestId('correct button');
        fireEvent.click(correctButton);
        fireEvent.click(correctButton);

        const cardContent3 = screen.getByText('Front 3');
        expect(cardContent3).toBeInTheDocument();

        fireEvent.click(prevButton);
        const cardContent2 = screen.getByText('Front 2');
        expect(cardContent2).toBeInTheDocument();

        fireEvent.click(prevButton);
        const cardContent1 = screen.getByText('Front 1');
        expect(cardContent1).toBeInTheDocument();
    });

    test('check if next button renders and works', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const nextButton = screen.getByTestId('next button');
        expect(nextButton).toHaveTextContent('Next');

        const cardContent1 = screen.getByText('Front 1');
        expect(cardContent1).toBeInTheDocument();

        fireEvent.click(nextButton);
        const cardContent2 = screen.getByText('Front 2');
        expect(cardContent2).toBeInTheDocument();

        fireEvent.click(nextButton);
        const cardContent3 = screen.getByText('Front 3');
        expect(cardContent3).toBeInTheDocument();
    });

    test('check if go back button renders', () => {
        render(<MemoryRouter>
                <StudyDeck />
               </MemoryRouter>);
        const backButton = screen.getByTestId('back button');
        expect(backButton).toHaveTextContent('Go Back');
    }); 

});