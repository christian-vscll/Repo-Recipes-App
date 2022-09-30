import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWith';
import userLocalStorage from '../services/userLocalStorage';

const user = { email: 'test@test.com', password: '1234567890' };
const profile = '/profile';

userLocalStorage.logout = jest.fn(() => localStorage.clear());

describe('profile page test', () => {
  it('click buttons', async () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginSubmit = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, user.email);
    userEvent.type(passwordInput, user.password);
    userEvent.click(loginSubmit);
    history.push('/profile');
    const emailText = screen.getByTestId('profile-email');
    expect(emailText).toBeInTheDocument();
    expect(emailText.innerHTML).toBe(user.email);
    const buttonFavorites = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavorites.innerHTML).toBe('Favorite Recipes');
    userEvent.click(buttonFavorites);
    expect(history.location.pathname).toBe('/favorite-recipes');
    history.push(profile);
    const buttonDone = screen.getByTestId('profile-done-btn');
    expect(buttonDone.innerHTML).toBe('Done Recipes');
    userEvent.click(buttonDone);
    expect(history.location.pathname).toBe('/done-recipes');
    history.push(profile);
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    await waitFor(() => {
      expect(userLocalStorage.logout).toHaveBeenCalled();
    });
  });
});
