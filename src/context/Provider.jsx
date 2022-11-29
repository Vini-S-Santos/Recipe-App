import React, { useState, useMemo } from 'react';
import Context from './Context';

function Provider(e) {
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [recipes, setRecipes] = useState([]);

  const values = useMemo(() => ({
    isValid,
    setIsValid,
    user,
    setUser,
    recipes,
    setRecipes }), [isValid, user, recipes]);

  const { children } = e;
  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
