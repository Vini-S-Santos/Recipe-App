import { expect, test } from '@jest/globals';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../context/Provider';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testes na pagina de Login', () => {
  test('Verifica os inputs na tela', () => {
    renderWithRouter(<Provider><App /></Provider>);
    const inputPassword = screen.getByTestId('password-input');
    const inputEmail = screen.getByTestId('email-input');
    expect(inputPassword).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
  });
  test('Verifica se existe o botao entrar na tela e se o mesmo esta desativado', () => {
    renderWithRouter(<Provider><App /></Provider>);
    const loginBtn = screen.getByRole('button', { name: 'Entrar' });
    expect(loginBtn).toBeDisabled();
    expect(loginBtn).toBeInTheDocument();
  });
  test('Verifica se ao digitar uma senha e email validos o botao e habilitado', () => {
    renderWithRouter(<Provider><App /></Provider>);
    const button = screen.getByRole('button', { name: 'Entrar' });
    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    userEvent.type(inputEmail, 'trybe@tryber.com');
    userEvent.type(inputPassword, 'test1234567');
    expect(button).toBeEnabled();
  });
  test('Verifica se ao digitar uma senha e email validos o botao e habilitado', () => {
    renderWithRouter(<Provider><App /></Provider>);
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem');
    Object.setPrototypeOf(window.localStorage.setItem, jest.fn());
    const testEmail = screen.getByTestId('email-input');
    const testPassword = screen.getByTestId('password-input');
    const testButton = screen.getByTestId('login-submit-btn');
    userEvent.type(testEmail, 'trybe@gmail.com');
    userEvent.type(testPassword, '12345678test');
    expect(testButton).toBeEnabled();
    userEvent.click(testButton);
    expect(window.localStorage.setItem).toHaveBeenCalled();
  });
});
