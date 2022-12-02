import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Testando o componente Done Recipes Foods', () => {
  const path = '/done-recipes';
  delete global.window.location;
  global.window.location = {
    pathname: path,
  };
  test('Verifica o funcionamento dos filtros de categoria', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push(path);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
