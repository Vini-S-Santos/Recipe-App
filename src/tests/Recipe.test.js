import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import meals from './mocks/meals';
import mealCategorys from './mocks/mealsCategory';
import drinks from './mocks/drinks';
import drinkCategories from './mocks/drinkCategories';
import beefMeals from './mocks/beefMeals';
import cocktail from './mocks/cocktailDrinks';
import Provider from '../context/Provider';

describe('testa funcionalidades dos botões de filtro', () => {
  afterEach(() => jest.clearAllMocks());

  it('testa botoes do /Meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(meals),
    }));

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategorys),
    }));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/meals');

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2));

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(beefMeals),
    }));

    const buttonBeef = screen.getByText('Beef');

    userEvent.click(buttonBeef);

    await waitFor(() => expect(global.fetch).toBeCalledWith(
      'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef',
    ));

    expect(screen.getByText('Fish pie')).toBeInTheDocument();

    userEvent.click(buttonBeef);

    await waitFor(() => expect(global.fetch).toBeCalled());
  });

  it('testa se o botao de filtro funciona também no /drinks', async () => {
    const jesti = () => {
      jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve(drinks),
      }));
    };
    jesti();

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    }));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks');

    await waitFor(() => expect(screen.getByRole('heading', {
      name: /ace/i,
    })).toBeInTheDocument());

    jesti();
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(cocktail),
    }));
    const buttonCocktail = screen.getByTestId('Cocktail-category-filter');

    userEvent.click(buttonCocktail);

    await waitFor(() => expect(global.fetch).toBeCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
    ));

    expect(screen.getByRole('heading', {
      name: /acid/i,
    })).toBeInTheDocument();

    userEvent.click(buttonCocktail);

    await waitFor(() => expect(global.fetch).toBeCalled());
  });
});
