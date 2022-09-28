import React, { useContext } from 'react';
// import RecipeDetails from '../pages/RecipeDetails';
import App from '../App';
import MyContext from '../context/MyContext';
// import { screen } from '@testing-library/react';
// import Recipes from '../pages/Recipes';
import renderWithRouter from './helper/renderWith';

test('Teste 1 Recipe Details', () => {
  const { history } = renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });

  // console.log(history);
  expect(history.location.pathname).toMatch('/meals/52771');
});

test('Teste 2 Recipe Details', () => {
  const { recipeDetail, setRecipeDetail } = useContext(MyContext);
  renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });

  setRecipeDetail();
  expect(recipeDetail).toBe(undefined);
});
