import React, { useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Context from '../context/Context';

import {
  ingredientSearch,
  nameSearch,
  LetraSearch,
} from '../services/fetchFilter';

function SearchBar() {
  const { searchType, setSearchType, searchInput, setRecipes } = useContext(Context);
  const history = useHistory();
  const location = useLocation();
  const path = location.pathname;

  async function fetchAPI() {
    const AlertFound = (filtrando) => {
      // console.log(filtrando);

      if (filtrando === null) {
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (filtrando.length === 1) {
        if (path === '/meals') {
          return history.push(`${path}/${filtrando[0].idMeal}`);
        }
        return history.push(`${path}/${filtrando[0].idDrink}`);
      }
      if (filtrando.length > 1) {
        return setRecipes(filtrando);
      }
    };

    if (searchType === 'ingredient') {
      const filtrando = await ingredientSearch(searchInput, path);
      AlertFound(filtrando);
      // console.log(filtrando);
    } if (searchType === 'name') {
      const filtrando = await nameSearch(searchInput, path);
      AlertFound(filtrando);
    } if (searchType === 'letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const filtrando = await LetraSearch(searchInput, path);
        AlertFound(filtrando);
        // console.log(filtrando);
      }
    }
  }
  return (
    <div>
      <form>
        <label htmlFor="search by ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="search by ingredient"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Ingredient

        </label>
        <label htmlFor="search by name">
          <input
            type="radio"
            data-testid="name-search-radio"
            value="name"
            checked={ searchType === 'name' }
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          Name
        </label>
        <label htmlFor="search by first letter">
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            value="letter"
            checked={ searchType === 'letter' }
            onChange={ ({ target }) => setSearchType(target.value) }
          />
          First letter
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => { fetchAPI(); } }
        >
          Search

        </button>
      </form>
    </div>
  );
}

export default SearchBar;
