import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWith';
import doneRecipesLocalStorage from '../services/doneRecipesLocalStorage';

const doneRecipes = [
  {
    alcoholicOrNot: '',
    category: 'Vegetarian',
    doneDate: '29/09/2022',
    id: '52771',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    name: 'Spicy Arrabiata Penne',
    nationality: 'Italian',
    tags: ['Pasta', 'Curry'],
    type: 'meal',
  },
  {
    alcoholicOrNot: 'Alcoholic',
    category: 'Cocktail',
    doneDate: '29/09/2022',
    id: '15224',
    image: 'https://www.thecocktaildb.com/images/media/drink/2dwae41504885321.jpg',
    name: 'Malibu Twister',
    nationality: '',
    tags: [],
    type: 'drink',
  },
];

describe('Component Header', () => {
  it('verify filters', async () => {
    doneRecipesLocalStorage.getAllDoneRecipe = jest.fn(() => doneRecipes);
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    await waitFor(() => {
      expect(doneRecipesLocalStorage.getAllDoneRecipe).toBeCalled();
    });
    const allButton = screen.getByTestId('filter-by-all-btn');
    expect(allButton).toBeInTheDocument();
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    expect(mealButton).toBeInTheDocument();
    const drinkButton = screen.getByTestId('filter-by-drink-btn');
    expect(drinkButton).toBeInTheDocument();
    const recipesAll = screen.getAllByTestId('recipeList');
    expect(recipesAll.length).toBe(2);
    userEvent.click(mealButton);
    const recipesMeals = screen.getAllByTestId('recipeList');
    expect(recipesMeals.length).toBe(1);
    const nameMeal = screen.getByTestId('0-horizontal-name');
    expect(nameMeal.innerHTML).toBe('Spicy Arrabiata Penne');
    userEvent.click(drinkButton);
    const recipesDrink = screen.getAllByTestId('recipeList');
    expect(recipesDrink.length).toBe(1);
    const nameDrink = screen.getByTestId('0-horizontal-name');
    expect(nameDrink.innerHTML).toBe('Malibu Twister');
    userEvent.click(allButton);
  });
});
