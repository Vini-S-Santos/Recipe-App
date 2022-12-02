import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Testando a página Recipe Details', () => {
  test('1 - Testa se as informações da receita de comida são exebidas corretamente', async () => {
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
    const cardname = await screen.findByTestId('1-recipe-card');
    expect(cardname).toBeInTheDocument();
    userEvent.click(cardname);
    act(() => {
      history.push('/meals/53060');
    });
    expect(history.location.pathname).toBe('/meals/53060');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const shareButton = await screen.findByTestId('share-btn');
    expect(shareButton).toHaveAttribute('src', 'shareIcon.svg');
    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const ingredientstList = await screen.findByRole('list');
    expect(ingredientstList).toBeInTheDocument();
  });
});
