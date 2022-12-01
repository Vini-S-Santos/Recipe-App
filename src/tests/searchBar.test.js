import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';
// import beefMeals from './mocks/beefMeals';

describe('Componente SearchBar', () => {
  global.alert = jest.fn();
  test('Testando Filtro', async () => {
    // viagem ate o /meals
    const img3 = '0-card-img';
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
    const firstBeefRecipe = await screen.findByTestId(img3);
    expect(firstBeefRecipe).toBeInTheDocument();
    userEvent.click(radioName);
    userEvent.clear(searchINP);
    userEvent.type(searchINP, 'beef');
    userEvent.click(searchButton);
    const firstBeefName = await screen.findByTestId(img3);
    expect(firstBeefName).toBeInTheDocument();
    //
    userEvent.click(radioLetter);
    userEvent.clear(searchINP);
    userEvent.type(searchINP, 'b');
    userEvent.click(searchButton);
    const firstBeefLetter = await screen.findByTestId(img3);
    expect(firstBeefLetter).toBeInTheDocument();
    //
    // userEvent.click(radioName);
    // userEvent.clear(searchINP);
    // expect(history.location.pathname).toBe('/meals/52977');
    //
    userEvent.click(radioIngredient);
    userEvent.clear(searchINP);
    userEvent.type(searchINP, 'Corba');
    userEvent.click(searchButton);
    await waitFor(() => expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });
});
