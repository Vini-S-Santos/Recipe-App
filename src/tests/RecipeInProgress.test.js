import React from 'react';
import { screen } from '@testing-library/react';
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

    const finishButton = screen.getByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishButton).toBeDefined();

    const firstIngredient = screen.findByTestId('0-ingredient');
    const secondIngredient = screen.findByTestId('1-ingredient');
    const thirdIngredient = screen.findByTestId('2-ingredient');
    const bedroomIngredient = screen.findByTestId('3-ingredient');
    const fifthIngredient = screen.findByTestId('4-ingredient');
    const sixthIngredient = screen.findByTestId('5-ingredient');
    const seventhIngredient = screen.findByTestId('6-ingredient');
    const eighthIngredient = screen.findByTestId('7-ingredient');
    const ninthIngredient = screen.findByTestId('8-ingredient');
    const tenthIngredient = screen.findByTestId('9-ingredient');
    const eleventhIngredient = screen.findByTestId('10-ingredient');
    const TwelfthIngredient = screen.findByTestId('11-ingredient');
    const ThirteenthIngredient = screen.findByTestId('12-ingredient');
    const fourteenthIngredient = screen.findByTestId('13-ingredient');

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

    const finishButton = screen.getByRole('button', {
      name: /finish recipe/i,
    });

    expect(finishButton).toBeDefined();

    const firstIngredient = screen.findByTestId('0-ingredient');
    const secondIngredient = screen.findByTestId('1-ingredient');
    const thirdIngredient = screen.findByTestId('2-ingredient');
    const bedroomIngredient = screen.findByTestId('3-ingredient');

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
