import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Testando a página Recipe Details', () => {
  test('1 - Testa se as informações da receita de comida são exibidas corretamente', async () => {
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
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    expect(startRecipe).toHaveTextContent(/Start Recipe/i);
    const burek = await screen.findByText(/Burek/i);
    expect(burek).toBeInTheDocument();
    const recipeVideo = await screen.findByTestId('video');
    expect(recipeVideo).toBeInTheDocument();
  });
  test('2 - Testa se as informações da receita de drinks são exibidas corretamente', async () => {
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
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');
    const cardname = await screen.findByTestId('1-recipe-card');
    expect(cardname).toBeInTheDocument();
    userEvent.click(cardname);
    act(() => {
      history.push('/drinks/17222');
    });
    expect(history.location.pathname).toBe('/drinks/17222');
  });
  test('3 - Verifica o funcionamento do botão Favoritos e se a receita é armazenada no localStorage corretamente', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/meals/52977');

    const favoriteButton = await screen.findByTestId('favorite-btn');
    expect(favoriteButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    await waitFor(() => {
      userEvent.click(favoriteButton);
      expect(favoriteButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    });
    history.push('/meals');
    await waitFor(() => {
      localStorage.setItem('isFavorite', JSON.stringify([{ id: '52977' }]));
      expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();
    });
  });
  test('4 - Verifica o funcionamento do botão Favoritos e se a receita é armazenada no localStorage corretamente', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('meals/53060/in-progress');

    const fylo = await screen.findByText(/filo pastry: 1 packet/i);
    expect(fylo).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeDefined();
    const startBtn = screen.getByRole('button', {
      name: /finish recipe/i,
    });
    userEvent.click(startBtn);
  });
});
