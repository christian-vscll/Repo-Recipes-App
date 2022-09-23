import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Testes footer', () => {
  render(<App />);
  const drinkIcon = screen.getByTestId('drinks-bottom-btn');
  const mealIcon = screen.getByTestId('meals-bottom-btn');
  expect(drinkIcon).toBeInTheDocument();
  expect(mealIcon).toBeInTheDocument();
});
