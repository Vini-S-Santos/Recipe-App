import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import simulateAPICall from '../helpers/simulateAPICall';
import mockMeals from './mocks/onceMeals';
import mockDrinks from './mocks/onceDrink';
import Provider from '../context/Provider';

Object.assign(navigator, {
  clipboard: {
    writeText: () => { },
  },
});
describe('Testa a tela RecipeInProgress', () => {
  const pathDrinck = '/drinks/17222/in-progress';

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Se ao clicar em todos os checkbox habilita e clicar no botão finalizar redireciona "/done-recipes"', async () => {
    simulateAPICall(mockMeals);
    const { history } = renderWithRouter(<Provider><App /></Provider>, {
      initialEntries: ['/meals/53013/in-progress'],
    });

    await waitFor(() => expect(screen.getByRole('button', {
      name: /finish recipe/i,
    })).toBeInTheDocument());

    const finishButton = screen.getByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishButton).toBeDefined();

    const firstIngredient = screen.findByTestId('0-ingredient-step');
    const secondIngredient = screen.findByTestId('1-ingredient-step');
    const thirdIngredient = screen.findByTestId('2-ingredient-step');
    const bedroomIngredient = screen.findByTestId('3-ingredient-step');
    const fifthIngredient = screen.findByTestId('4-ingredient-step');
    const sixthIngredient = screen.findByTestId('5-ingredient-step');
    const seventhIngredient = screen.findByTestId('6-ingredient-step');
    const eighthIngredient = screen.findByTestId('7-ingredient-step');
    const ninthIngredient = screen.findByTestId('8-ingredient-step');
    const tenthIngredient = screen.findByTestId('9-ingredient-step');
    const eleventhIngredient = screen.findByTestId('10-ingredient-step');
    const TwelfthIngredient = screen.findByTestId('11-ingredient-step');
    const ThirteenthIngredient = screen.findByTestId('12-ingredient-step');
    const fourteenthIngredient = screen.findByTestId('13-ingredient-step');

    expect(firstIngredient).toBeDefined();
    expect(secondIngredient).toBeDefined();
    expect(thirdIngredient).toBeDefined();
    expect(bedroomIngredient).toBeDefined();
    expect(fifthIngredient).toBeDefined();
    expect(sixthIngredient).toBeDefined();
    expect(seventhIngredient).toBeDefined();
    expect(eighthIngredient).toBeDefined();
    expect(ninthIngredient).toBeDefined();
    expect(tenthIngredient).toBeDefined();
    expect(eleventhIngredient).toBeDefined();
    expect(TwelfthIngredient).toBeDefined();
    expect(ThirteenthIngredient).toBeDefined();
    expect(fourteenthIngredient).toBeDefined();

    userEvent.click(await firstIngredient);
    userEvent.click(await secondIngredient);
    userEvent.click(await thirdIngredient);
    userEvent.click(await bedroomIngredient);
    userEvent.click(await fifthIngredient);
    userEvent.click(await sixthIngredient);
    userEvent.click(await seventhIngredient);
    userEvent.click(await eighthIngredient);
    userEvent.click(await ninthIngredient);
    userEvent.click(await tenthIngredient);
    userEvent.click(await eleventhIngredient);
    userEvent.click(await TwelfthIngredient);
    userEvent.click(await ThirteenthIngredient);
    userEvent.click(await fourteenthIngredient);

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Se ao clicar em todos os checkbox habilita e clicar no botão finalizar redireciona "/done-recipes"', async () => {
    simulateAPICall(mockDrinks);
    const { history } = renderWithRouter(<Provider><App /></Provider>, {
      initialEntries: [pathDrinck],
    });

    await waitFor(() => expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument());

    const finishButton = screen.getByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishButton).toBeDefined();

    await waitFor(() => expect(screen.getByText(/finish recipe/i)).toBeInTheDocument());

    const firstIngredient = screen.findByTestId('0-ingredient-step');
    const secondIngredient = screen.findByTestId('1-ingredient-step');
    const thirdIngredient = screen.findByTestId('2-ingredient-step');
    const bedroomIngredient = screen.findByTestId('3-ingredient-step');

    expect(firstIngredient).toBeDefined();
    expect(secondIngredient).toBeDefined();
    expect(thirdIngredient).toBeDefined();
    expect(bedroomIngredient).toBeDefined();

    userEvent.click(await firstIngredient);
    userEvent.click(await secondIngredient);
    userEvent.click(await thirdIngredient);
    userEvent.click(await bedroomIngredient);

    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
