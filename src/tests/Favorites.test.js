import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import favoriteRecipesOne from './mocks/favoriteRecipeOne';
import Provider from '../context/Provider';
import App from '../App';

Object.assign(navigator, {
  clipboard: {
    writeText: () => { },
  },
});
describe('Testa a tela favoriteRecipes', () => {
  const favoriteRecipes = '/favorite-recipes';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it(' 1 - Verifica se filtra por bebidas', () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouter(
      <Provider><App /></Provider>,
      { initialEntries: [favoriteRecipes] },
    );

    const gg = screen.getByText(/gg/i);

    expect(gg).toBeInTheDocument();

    const sushi = screen.getByText(/sushi/i);

    expect(sushi).toBeInTheDocument();

    const bigMac = screen.getByText(/big mac/i);

    expect(bigMac).toBeInTheDocument();

    const buttonDrinks = screen.getByTestId('filter-by-drink-btn');

    expect(buttonDrinks).toBeInTheDocument();

    userEvent.click(buttonDrinks);

    expect(gg).toBeDefined();
    expect(bigMac).not.toBeInTheDocument();
  });
  it(' 2 - Verifica se filtra por comidas', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: [favoriteRecipes] });

    const gg = screen.queryByText(/gg/i);

    expect(gg).toBeDefined();

    const sushi = screen.getByText(/sushi/i);

    expect(sushi).toBeInTheDocument();

    const bigMac = screen.queryByText(/big mac/i);

    expect(bigMac).toBeInTheDocument();

    const buttonMeals = screen.getByTestId('filter-by-meal-btn');

    expect(buttonMeals).toBeDefined();

    userEvent.click(buttonMeals);

    const g = screen.queryByText(/gg/i);

    expect(bigMac).toBeDefined();
    expect(sushi).toBeDefined();
    expect(g).not.toBeInTheDocument();
  });
  it(' 3 - Verifica se filtra por Todos', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: [favoriteRecipes] });

    const gg = screen.queryByText(/gg/i);

    expect(gg).toBeDefined();

    const sushi = screen.getByText(/sushi/i);

    expect(sushi).toBeInTheDocument();

    const bigMac = screen.queryByText(/big mac/i);

    expect(bigMac).toBeInTheDocument();

    const buttonMeals = screen.getByTestId('filter-by-meal-btn');

    expect(buttonMeals).toBeDefined();

    userEvent.click(buttonMeals);

    const g = screen.queryByText(/gg/i);

    expect(bigMac).toBeDefined();
    expect(sushi).toBeDefined();
    expect(g).not.toBeInTheDocument();

    const buttonAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(buttonAll);

    expect(bigMac).toBeDefined();
    expect(sushi).toBeDefined();
    expect(gg).toBeDefined();
  });

  it(' 4 - Verifica se copia o link na imagem', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    jest.spyOn(navigator.clipboard, 'writeText');
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: [favoriteRecipes] });

    const horizontalShare = screen.getByTestId('1-horizontal-share-btn');

    userEvent.click(horizontalShare);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/drinks/15997');

    const textCopy = screen.findByText(/Link copied!/i);

    expect(textCopy).toBeDefined();

    setTimeout(() => {
      expect(textCopy).not.toBeDefined();
    }, 3000);
  });

  it(' 5 - Verifica se desfavorita', async () => {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(favoriteRecipesOne),
    );
    renderWithRouter(<Provider><App /></Provider>, { initialEntries: [favoriteRecipes] });

    const gg = screen.queryByText(/gg/i);

    expect(gg).toBeDefined();

    const buttonDisfavor = screen.getByTestId('0-horizontal-favorite-btn');

    userEvent.click(buttonDisfavor);
  });
});
