import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import PageContainer from '../PageContainer';
import { BrowserRouter } from 'react-router-dom';

describe('NavBar Component', () => {
    test('Navbar collapsability functions properly', () => {
        render(<BrowserRouter>
                    <React.StrictMode>
                        <div className="flex">
                            <PageContainer/>
                        </div>
                    </React.StrictMode>
                </BrowserRouter>);

        var navbarElement = screen.getByTestId("Navbar");
        expect(navbarElement).toBeInTheDocument();
        const toolbarElement = screen.getByTestId("Toolbar");
        expect(toolbarElement).toBeInTheDocument();
        const collapserElement = screen.getByTestId("Collapser");
        expect(collapserElement).toBeInTheDocument();

        fireEvent.click(collapserElement);
        expect(navbarElement).not.toBeInTheDocument();
        expect(toolbarElement).toBeInTheDocument();
        expect(collapserElement).toBeInTheDocument();

        fireEvent.click(collapserElement);
        navbarElement = screen.getByTestId("Navbar");
        expect(navbarElement).toBeInTheDocument();
        expect(toolbarElement).toBeInTheDocument();
        expect(collapserElement).toBeInTheDocument();
    });

    test('Navbar navigation functions properly', () => {
        render(<BrowserRouter>
                    <React.StrictMode>
                        <div className="flex">
                            <PageContainer/>
                        </div>
                    </React.StrictMode>
                </BrowserRouter>);

        const homeIconElement = screen.getByTestId("HomeIcon")
        const decksIconElement = screen.getByTestId("DecksIcon")
        const timerIconElement = screen.getByTestId("TimerIcon")
        const profileIconElement = screen.getByTestId("ProfileIcon")
        var loginButtonElement = screen.getByTestId("LoginButton")
        var registerButtonElement = screen.getByTestId("RegisterButton")

        expect(homeIconElement).toBeInTheDocument;
        expect(decksIconElement).toBeInTheDocument;
        expect(timerIconElement).toBeInTheDocument;
        expect(profileIconElement).toBeInTheDocument;
        expect(loginButtonElement).toBeInTheDocument;
        expect(registerButtonElement).toBeInTheDocument;

        var appElement = screen.getByTestId("Home");
        expect(appElement).toBeInTheDocument();
        
        fireEvent.click(decksIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Decks");
        fireEvent.click(timerIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Timer");
        fireEvent.click(profileIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Profile");
        fireEvent.click(homeIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Home");
    });
  });