import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <>
        <div>Login</div>
        <label htmlFor="input-mail">
          <input
            type="text"
            id="email-input"
            data-testid="email-input"
            name="email"
          />
        </label>
        <label htmlFor="input-password">
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
            name="password"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Entrar
        </button>

      </>
    );
  }
}

export default Login;
