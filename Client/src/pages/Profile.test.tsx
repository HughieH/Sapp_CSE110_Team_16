import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';
import { MemoryRouter } from 'react-router-dom';

describe('Profile Component', () => {
  test('renders the Icon, Statistics, and Achievements sections', () => {
    render(<MemoryRouter>
              <Profile />
            </MemoryRouter>);

    const ProfileIcon = screen.getByTestId("ProfileIcon");
    expect(ProfileIcon).toBeInTheDocument();
    const ProfileStats = screen.getByTestId("ProfileStats");
    expect(ProfileStats).toBeInTheDocument();
    const ProfileAchievements = screen.getByTestId("ProfileAchievements");
    expect(ProfileAchievements).toBeInTheDocument();
  });
});