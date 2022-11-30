import React from 'react';

function SearchBar() {
  return (
    <div>
      <form>
        <label htmlFor="search by ingredient">
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="search by ingredient"
          />
          Ingrediente

        </label>
        <label htmlFor="search by name">
          <input type="radio" data-testid="name-search-radio" />
          Nome
        </label>
        <label htmlFor="search by first letter">
          <input type="radio" data-testid="first-letter-search-radio" />
          Primeira Letra
        </label>
        <button type="button" data-testid="exec-search-btn">Buscar</button>
      </form>
    </div>
  );
}

export default SearchBar;
