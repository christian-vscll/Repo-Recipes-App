import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWith';
import mealsData from './helper/oneMealsMock';
import drinkData from './helper/oneDrinksMock';
// import copy from 'clipboard-copy';

const favoritebtn = 'favorite-btn';
const finishRecipeBtn = 'finish-recipe-btn';
const mealsLink = '/meals/52771/in-progress';

describe('Component Header', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mealsData),
    }));
  });

  it('testando pagina RecipeInProgress', async () => {
    renderWithRouter(<App />, { initialEntries: [mealsLink] });
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
    const shareButton = screen.getByTestId('share-btn');
    expect(shareButton).toBeInTheDocument();
    const finishButton = screen.getByTestId(finishRecipeBtn);
    expect(finishButton).toBeInTheDocument();
    const FavButton = screen.getByTestId(favoritebtn);
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
      expect(ingredient).toBeInTheDocument();
      expect(ingredient.innerHTML.includes(key)).toBeTruthy();
      expect(ingredient.innerHTML.includes(ingredientList[key])).toBeTruthy();
    });
  });
  it('teste dos ingredientes', async () => {
    document.execCommand = jest.fn(() => Promise.resolve());
    const { history } = renderWithRouter(<App />, {
      initialEntries: [mealsLink],
    });
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
    const finish = screen.getByTestId(finishRecipeBtn);
    expect(finish).toBeDisabled();
    const max = 8;
    for (let i = 0; i < max; i += 1) {
      const ingrediente = screen.getByTestId(`${i}-ingredient-step`);
      const ingredienteCheck = screen.getByTestId(`${i}-ingredient-step-check`);
      expect(ingrediente).toBeInTheDocument();
      expect(ingredienteCheck).not.toBeChecked();
      userEvent.click(ingredienteCheck);
      expect(ingredienteCheck).toBeChecked();
    }
    expect(finish).toBeEnabled();
    const shareButton = screen.getByTestId('share-btn');
    userEvent.click(shareButton);
    await waitFor(() => {
      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });
    // const shareButtonByText = screen.queryByText(/'Link copied!'/i);
    // expect(shareButtonByText).toBeInTheDocument();
    const favoriteButton = screen.getByTestId(favoritebtn);
    expect(favoriteButton.src.includes('white')).toBeTruthy();
    userEvent.click(favoriteButton);
    const FavoritedButton = screen.getByTestId(favoritebtn);
    expect(FavoritedButton.src.includes('black')).toBeTruthy();
    userEvent.click(favoriteButton);
    const FavoritedButtonDisable = screen.getByTestId(favoritebtn);
    expect(FavoritedButtonDisable.src.includes('white')).toBeTruthy();
    userEvent.click(finish);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('testando bebidas', async () => {
    const link = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=12474';
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(drinkData),
    }));
    renderWithRouter(<App />, {
      initialEntries: ['/drinks/12474/in-progress'],
    });
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
      expect(global.fetch).toHaveBeenCalledWith(link);
    });
    const max = 3;
    for (let i = 0; i < max; i += 1) {
      const ingrediente = screen.getByTestId(`${i}-ingredient-step`);
      const ingredienteCheck = screen.getByTestId(`${i}-ingredient-step-check`);
      expect(ingrediente).toBeInTheDocument();
      expect(ingredienteCheck).not.toBeChecked();
      userEvent.click(ingredienteCheck);
      expect(ingredienteCheck).toBeChecked();
    }
    const finishButton = screen.getByTestId('finish-recipe-btn');
    userEvent.click(finishButton);
  });
  it('favorite in local Storage', async () => {
    const fav = {
      id: '52771',
      type: 'meal',
    };
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify([fav]));
    history.push(mealsLink);
    await waitFor(() => {
      expect(global.fetch).toBeCalled();
    });
    const FavoritedButton = screen.getByTestId(favoritebtn);
    expect(FavoritedButton.src.includes('black')).toBeTruthy();
  });
});
