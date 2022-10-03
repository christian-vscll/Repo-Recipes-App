import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWith';

const rotaUm = '/favorite-recipes';
test('Teste 1 Favorite Recipes', () => {
  const { history } = renderWithRouter(<App />, { initialEntries: [rotaUm] });
  expect(history.location.pathname).toMatch(rotaUm);
});

test('Teste 2 Favorite Recipes', () => {
  renderWithRouter(<App />, { initialEntries: [rotaUm] });
  const btnFilterAll = screen.getAllByTestId('filter-by-all-btn');
  userEvent.click(btnFilterAll);

  const btnFilterMeal = screen.getAllByTestId('filter-by-meal-btn');
  expect(btnFilterMeal).toBeInTheDocument();
});
