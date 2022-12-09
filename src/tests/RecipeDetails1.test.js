import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Provider from '../context/Provider';

describe('Testando a página Recipe Details', () => {
  afterEach(() => jest.clearAllMocks());

  test('7 - Verifica o funcionamento do botão Push e se a receita é armazenada no localStorage corretamente', async () => {
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks/13938/');
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    expect(startRecipe).toBeInTheDocument();
    userEvent.click(startRecipe);
    expect(history.location.pathname).toBe('//13938/in-progress');
  });
  it('testa funcionalidade do botão de continuar receita', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 53013: ['3', '11', '12'] } }));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/meals/53013');

    await waitFor(() => expect(screen.getByRole('button', {
      name: /continue recipe/i,
    })).toBeInTheDocument());

    const button = screen.getByTestId('start-recipe-btn');

    expect(button).toHaveTextContent('Continue Recipe');

    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/meals/53013/in-progress'));
  });
  it('testa funcionalidade do botão de continuar receita com bebidas', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: { 178319: ['1', '2'] } }));

    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks/178319');

    await waitFor(() => expect(screen.getByText(/continue recipe/i)).toBeInTheDocument());

    const button = screen.getByTestId('start-recipe-btn');

    expect(button).toHaveTextContent('Continue Recipe');

    userEvent.click(button);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319/in-progress'));
  });
  it('Verifica se a pagina de uma comida é renderizada corretamente', async () => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ drinks: {}, meals: {} }));
    const { history } = renderWithRouter(<Provider><App /></Provider>);
    history.push('/drinks/13938');

    await waitFor(() => expect(screen.getByTestId('0-ingredient-name-and-measure')).toBeInTheDocument());

    const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
    const photo = screen.getByTestId('recipe-photo');
    const text = screen.getByTestId('recipe-category');
    const title = screen.getByTestId('recipe-title');
    const instructions = screen.getByTestId('instructions');
    const ingredientList = screen.getAllByRole('listitem');
    const recommendations = screen.getAllByRole('link');
    const buttonStart = screen.getByTestId('start-recipe-btn');
    const corba = screen.getByRole('heading', {
      name: /corba/i,
    });

    expect(ingredient).toHaveTextContent('Absolut Vodka: 1 oz');
    expect(photo).toBeInTheDocument();
    expect(text).toHaveTextContent('Alcoholic');
    expect(title).toHaveTextContent('AT&T');
    expect(instructions).toBeInTheDocument();
    expect(ingredientList.length).toBe(3);
    expect(recommendations.length).toBe(6);
    expect(buttonStart).toBeInTheDocument();
    expect(corba).toBeInTheDocument();
    expect(buttonStart).toHaveTextContent(/START RECIPE/i);

    userEvent.click(buttonStart);

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/13938/in-progress'));
  });
});
