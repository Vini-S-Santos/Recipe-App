import React, { useContext } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const { searchType, setSearchType, fetchAPI } = useContext(Context);
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
          onClick={ () => fetchAPI() }
        >
          Search

        </button>
      </form>
    </div>
  );
}

export default SearchBar;
