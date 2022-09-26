import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/renderWith';

describe('Component Header', () => {
  const pageTitle = 'page-title';
  it('funcionalidades do header', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');
    const HeaderComponent = screen.getByTestId(pageTitle);
    expect(HeaderComponent).toBeInTheDocument();
    const searchComponent = screen.getByTestId('search-top-btn');
    expect(searchComponent).toBeInTheDocument();
    const profileComponent = screen.getByTestId('profile-top-btn');
    expect(profileComponent).toBeInTheDocument();
    userEvent.click(searchComponent);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    waitForElementToBeRemoved(searchBar);
    userEvent.click(searchComponent);
    userEvent.click(profileComponent);
    expect(history.location.pathname).toBe('/profile');
  });

  it('test de renderizaçao em rotas diferentes.', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    let HeaderComponent = screen.getByTestId(pageTitle);
    expect(HeaderComponent.innerHTML).toBe('Drinks');
    history.push('/done-recipes');
    HeaderComponent = screen.getByTestId(pageTitle);
    expect(HeaderComponent.innerHTML).toBe('Done Recipes');
    history.push('/favorite-recipes');
    HeaderComponent = screen.getByTestId(pageTitle);
    expect(HeaderComponent.innerHTML).toBe('Favorite Recipes');
    waitForElementToBeRemoved(HeaderComponent);
    history.push('/meals/id-da-receita');
    history.push('/profile');
    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);
  });
});
