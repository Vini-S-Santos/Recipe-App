import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Página de login', () => {
  test('Componentes na página de perfil', () => {
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
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const email = screen.getByTestId('profile-email');
    const doneRecipeBTN = screen.getByRole('button', {
      name: /done recipes/i,
    });
    const favRecipesBTN = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    const logoutBTN = screen.getByRole('button', {
      name: /logout/i,
    });
    expect(email).toBeInTheDocument();
    expect(favRecipesBTN).toBeInTheDocument();
    expect(doneRecipeBTN).toBeInTheDocument();
    expect(logoutBTN).toBeInTheDocument();
    userEvent.click(doneRecipeBTN);
    expect(history.location.pathname).toBe('/done-recipes');
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const favRecipesBTN2 = screen.getByRole('button', {
      name: /favorite recipes/i,
    });
    userEvent.click(favRecipesBTN2);
    expect(history.location.pathname).toBe('/favorite-recipes');
    act(() => {
      history.push('/profile');
    });
    expect(history.location.pathname).toBe('/profile');
    const logoutBTN2 = screen.getByRole('button', {
      name: /logout/i,
    });
    userEvent.click(logoutBTN2);
    expect(history.location.pathname).toBe('/');
  });
});
