import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';

const { history } = renderWithRouter(<App />);
const { pathname } = history.location;
const EMAIL_TEST = 'test@trybe.com';
const PASSWORD_TEST = 123456;

describe('Test at Login page', () => {
  it('Should be at pathname "/"', () => {
    renderWithRouter(<App />);
    expect(pathname).toBe('/');
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

  it('Should check input validation', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);
    userEvent.click(enterBtn);
  });
});
