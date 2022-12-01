import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
// import beefMeals from './mocks/beefMeals';

describe('Componente SearchBar', () => {
  test('Testando Filtro', async () => {
    // viagem ate o /meals
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterButton = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(enterButton);
    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');
    //
    const searchBTN = screen.getByTestId('search-top-btn');
    userEvent.click(searchBTN);
    const searchINP = screen.getByTestId('search-input');
    expect(searchINP).toBeInTheDocument();
    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    const radioName = screen.getByTestId('name-search-radio');
    const radioLetter = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    expect(radioIngredient).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioLetter).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    userEvent.type(searchINP, 'beef');
    userEvent.click(searchButton);
    const firstBeefRecipe = await screen.findByTestId('0-card-img');
    expect(firstBeefRecipe).toBeInTheDocument();
    userEvent.click(radioName);
    userEvent.type(searchINP, 'beef');
    const firstBeefName = await screen.findByTestId('0-card-img');
    expect(firstBeefName).toBeInTheDocument();
    //
    userEvent.click(radioLetter);
    userEvent.type(searchINP, 'b');
    const firstBeefLetter = await screen.findByTestId('0-card-img');
    expect(firstBeefLetter).toBeInTheDocument();
  });
});
