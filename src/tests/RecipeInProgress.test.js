import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWith';
import mealsData from './helper/oneMealsMock';

describe('Component Header', () => {
  it('testando pagina RecipeInProgress', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsData),
    }));
    renderWithRouter(<App />, { initialEntries: ['/meals/52771/in-progress'] });
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    const finishButton = screen.getByTestId('finish-recipe-btn');
    expect(finishButton).toBeInTheDocument();
    const FavButton = screen.getByTestId('favorite-btn');
    expect(FavButton).toBeInTheDocument();
    const imageElement = screen.getByTestId('recipe-photo');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    const titleElement = screen.getByTestId('recipe-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.innerHTML).toBe('Spicy Arrabiata Penne');
    const categoryElement = screen.getByTestId('recipe-category');
    expect(categoryElement).toBeInTheDocument();
    expect(categoryElement.innerHTML).toBe('Vegetarian');
    const instructionsElement = screen.getByTestId('instructions');
    expect(instructionsElement).toBeInTheDocument();
    expect(instructionsElement.innerHTML).toBe(mealsData.meals[0].strInstructions);
    const { ingredientList } = mealsData;
    Object.keys(ingredientList).forEach((key, index) => {
      const ingredient = screen.getByTestId(`${index}-ingredient-step`);
      expect(ingredient).toBeInTheDocument()
      expect(ingredient.innerHTML.includes(key)).toBeTruthy();
      expect(ingredient.innerHTML.includes(ingredientList[key])).toBeTruthy();
    })
  })
});
