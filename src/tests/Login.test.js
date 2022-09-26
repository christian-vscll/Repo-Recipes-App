import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

describe('Test at Login page', () => {
  it('Should be at pathname "/"', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');
  });

  it('Should have the corrects inputs', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Should have enter btn on screen', () => {
    renderWithRouter(<App />);
    const enterBtn = screen.getByTestId('login-submit-btn');
    expect(enterBtn).toBeInTheDocument();
  });

  it('Should check input validation, and redirect after user click on enter', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    expect(enterBtn).toBeDisabled();
    userEvent.type(emailInput, 'test@trybe.com');
    expect(emailInput).toHaveValue('test@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveValue('1234567');
    expect(enterBtn).toBeEnabled();
    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/meals');
  });
});
