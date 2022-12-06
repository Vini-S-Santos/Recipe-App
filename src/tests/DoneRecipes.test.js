import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
import doneRecipes from './mocks/doneRecipers';

const done = '/done-recipes';

describe('Testando o componente Done Recipes Foods', () => {
  const path = done;
  delete global.window.location;
  global.window.location = {
    pathname: path,
  };
  test('Verifica o funcionamento dos filtros de categoria', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push(path);
    expect(history.location.pathname).toBe(done);
  });

  it('Testa se os elementos são renderizados na página', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push(done);

    await waitFor(() => expect(screen.getByRole('img', {
      name: /spicy arrabiata penne/i,
    })).toBeInTheDocument());

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /meals/i,
    })).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();

    expect(await screen.findByText(doneRecipes[0].name)).toBeInTheDocument();
    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
  });

  it('Verifica o funcionamento dos botões de filtro do profile', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/done-recipes');

    await waitFor(() => expect(screen.getByAltText(/spicy arrabiata penne/i)).toBeInTheDocument());

    const btnFilterAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterMeal = screen.getByRole('button', {
      name: /meals/i,
    });
    const btnFilterDrink = screen.getByTestId('filter-by-drink-btn');

    userEvent.click(btnFilterMeal);

    expect(screen.queryByText(doneRecipes[1].name)).not.toBeInTheDocument();

    userEvent.click(btnFilterAll);
    userEvent.click(btnFilterDrink);

    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
    expect(screen.queryByText(doneRecipes[0].name)).not.toBeInTheDocument();

    userEvent.click(btnFilterAll);

    expect(await screen.findByText(doneRecipes[1].name)).toBeInTheDocument();
    expect(await screen.findByText(doneRecipes[0].name)).toBeInTheDocument();
  });
  test('testa funcionalidade do botão de share', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/meals/52771');

    document.execCommand = jest.fn(() => Promise.resolve('Copiado!'));

    await waitFor(() => expect(screen.getByRole('button', {
      name: /share icon/i,
    })).toBeInTheDocument());

    const shareBtn = screen.getByRole('button', {
      name: /share icon/i,
    });
    userEvent.click(shareBtn);
    await waitFor(() => expect(screen.getByText(/link copied!/i)).toBeInTheDocument());
  });
});
