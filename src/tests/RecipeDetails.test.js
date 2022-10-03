import React from 'react';
import App from '../App';
import renderWithRouter from './helper/renderWith';

const rotaUm = '/meals/52771';
test('Teste 1 Recipe Details', () => {
  const { history } = renderWithRouter(<App />, { initialEntries: [rotaUm] });
  expect(history.location.pathname).toMatch(rotaUm);
});
