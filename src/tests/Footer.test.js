import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helper/renderWith';

test('Testes footer 1', () => {
  renderWithRouter(<Recipes />);
  const drinkIcon = screen.getByTestId('drinks-bottom-btn');
  const mealIcon = screen.getByTestId('meals-bottom-btn');
  expect(drinkIcon).toBeInTheDocument();
  expect(mealIcon).toBeInTheDocument();
});

test('Testes footer 2', () => {
  const { history } = renderWithRouter(<Recipes />);
  history.push('/meals');
  const mealIcon = screen.getByTestId('meals-bottom-btn');
  userEvent.click(mealIcon);
  expect(history.location.pathname).toMatch('/meals');

  const drinkIcon = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(drinkIcon);
  expect(history.location.pathname).toMatch('/drinks');
});
