import React from 'react';

import { render, screen } from '@testing-library/react';
import PageContainer from '../PageContainer';
import { BrowserRouter } from 'react-router-dom';

import userEvent from '@testing-library/user-event'

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
        const collapserElement = screen.getByTestId("Collapser")
        expect(collapserElement).toBeInTheDocument();

        userEvent.click(collapserElement);
        expect(navbarElement).not.toBeInTheDocument();
        expect(toolbarElement).toBeInTheDocument();
        expect(collapserElement).toBeInTheDocument();

        userEvent.click(collapserElement);
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
        
        userEvent.click(decksIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Decks");
        userEvent.click(timerIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Timer");
        userEvent.click(profileIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Profile");
        userEvent.click(homeIconElement);
        expect(appElement).not.toBeInTheDocument();
        appElement = screen.getByTestId("Home");
    });
  });