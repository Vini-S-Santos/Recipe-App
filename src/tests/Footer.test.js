import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Testa Footer', () => {
  it('Verifica funcionalidades do FOoter', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/meals');

    await waitFor(() => expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument());

    const drinkButton = screen.getByTestId('drinks-bottom-btn');
    const mealsButton = screen.getByTestId('meals-bottom-btn');

    expect(mealsButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    expect(history.location.pathname).toBe('/drinks');

    userEvent.click(mealsButton);

    expect(history.location.pathname).toBe('/meals');
  });
});
