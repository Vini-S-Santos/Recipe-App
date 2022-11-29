import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Login(props) {
  const { isValid, setIsValid, user, setUser } = useContext(Context);

  const onChange = ({ target: { value, name } }) => {
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const { history } = props;
    const { email } = user;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    const magicNumber = 6;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    const checkMail = emailRegex.test(user.email);
    const checkPassword = user.password.length > magicNumber;
    if (checkMail && checkPassword) { setIsValid(false); } else { setIsValid(true); }
  }, [user.email, user.password]);

  return (
    <div>
      <div>Login</div>
      <label htmlFor="input-mail">
        <input
          type="text"
          id="email-input"
          data-testid="email-input"
          name="email"
          value={ user.email }
          onChange={ onChange }
          placeholder="Email"
        />
      </label>
      <label htmlFor="input-password">
        <input
          type="password"
          id="password-input"
          data-testid="password-input"
          name="password"
          value={ user.password }
          onChange={ onChange }
          placeholder="Password"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isValid }
        onClick={ handleClick }
      >
        Entrar
      </button>

    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}.isRequired;

export default Login;
