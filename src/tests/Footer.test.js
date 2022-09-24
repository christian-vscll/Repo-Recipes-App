import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, useHistory } from 'react-router-dom';
import Recipes from '../pages/Recipes';

// test('Testes footer 1', () => {
//   renderWithRouter(<Recipes />);
//   const drinkIcon = screen.getByTestId('drinks-bottom-btn');
//   const mealIcon = screen.getByTestId('meals-bottom-btn');
//   expect(drinkIcon).toBeInTheDocument();
//   expect(mealIcon).toBeInTheDocument();
// });

test('Testes footer 2', () => {
  render(
    <Router>
      <Recipes />
    </Router>,
  );
  const history = useHistory();
  const mealIcon = screen.getByTestId('meals-bottom-btn');
  userEvent.click(mealIcon);
  // console.log(tela);
  console.log(history);
  // expect(history.location.pathname).toMatch('/meals');
});
