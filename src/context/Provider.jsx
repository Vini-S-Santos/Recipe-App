import React, { useState, useMemo } from 'react';
import Context from './Context';

function Provider(e) {
  const [isValid, setIsValid] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [searchType, setSearchType] = useState('ingredient');

  const values = useMemo(() => {
    function fetchAPI() {
      if (searchType === 'ingredient') {
        console.log('oi');
      } else if (searchType === 'name') {
        console.log('tchau');
      } else if (searchType === 'letter') {
        console.log('teh mais');
      }
    }
    return {
      isValid,
      setIsValid,
      user,
      setUser,
      recipes,
      setRecipes,
      searchType,
      setSearchType,
      fetchAPI,
    };
  }, [isValid, user, recipes, searchType, setSearchType]);

  const { children } = e;
  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
