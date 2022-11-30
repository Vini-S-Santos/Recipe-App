import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Testando o Header', () => {
  test('Botao de pesquisa', () => {
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
    userEvent.click(searchBTN);
    expect(searchINP).not.toBeInTheDocument();
  });
});
