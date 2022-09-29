import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import meals from '../../cypress/mocks/meals';
import mealsCategories from '../../cypress/mocks/mealCategories';
import beefMeals from '../../cypress/mocks/beefMeals';
import drinks from '../../cypress/mocks/drinks';
import drinksCategories from '../../cypress/mocks/drinkCategories';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import App from '../App';

describe('It is going to test Recipes component', () => {
  test('if the path /meals has 12 images', async () => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsCategories).mockResolvedValueOnce(meals),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const mealsImgs = screen.getAllByTestId(/-card-img/i);
    expect(mealsImgs).toHaveLength(12);
  });

  test('if the path /drinks has 12 images', async () => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksCategories).mockResolvedValueOnce(drinks),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const drinksImgs = screen.getAllByTestId(/-card-img/i);
    expect(drinksImgs).toHaveLength(12);
  });

  test('if when you click in the "Beef" button toggles to a filtered list then goes back to the original', async () => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(beefMeals)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(mealsCategories),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const beefButton = screen.getByTestId('Beef-category-filter');
    userEvent.click(beefButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const beefAndMustardPieText = screen.getByText(/beef and mustard/i);
    expect(beefAndMustardPieText).toBeInTheDocument();
    userEvent.click(beefButton);
    const corbaText = screen.getByText(/corba/i);
    expect(corbaText).toBeInTheDocument();
  });

  test('if when you click in the "Ordinary" button toggles to a filtered list then goes back to the original', async () => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinksCategories),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const ordinaryDrinkButton = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryDrinkButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const longIslandText = screen.getByText(/long island/i);
    expect(longIslandText).toBeInTheDocument();
    userEvent.click(ordinaryDrinkButton);
    const ggText = screen.getByText(/gg/i);
    expect(ggText).toBeInTheDocument();
  });

  test('if when you click in the "All" button toggles original list', async () => {
    cleanup();
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(ordinaryDrinks)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(drinksCategories),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const ordinaryDrinkButton = screen.getByTestId('Ordinary Drink-category-filter');
    userEvent.click(ordinaryDrinkButton);
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const longIslandText = screen.getByText(/long island/i);
    expect(longIslandText).toBeInTheDocument();
    const allButton = screen.getByTestId(/all-category-filter/i);
    userEvent.click(allButton);
    const ggText = screen.getByText(/gg/i);
    expect(ggText).toBeInTheDocument();
  });
});
