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
  const [searchInput, setSearchInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  // const [filtered, setFiltered] = useState([]);
  const values = useMemo(() => ({
    isValid,
    setIsValid,
    user,
    setUser,
    recipes,
    setRecipes,
    searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    favorites,
    setFavorites,
    isStarted,
    setIsStarted,
    // filtered,
  }), [isValid, user, recipes, searchType,
    setSearchType,
    searchInput,
    setSearchInput,
    isStarted,
    setIsStarted,
    favorites,
    setFavorites]);

  const { children } = e;
  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
