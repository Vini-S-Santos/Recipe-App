import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchAPIs from '../services/fetchAPI';
import Context from '../context/Context';

const numberFilters = 5;

function ButtonFilters({ recipeType }) {
  const [categorys, setCategorys] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('');

  const { setIsLoading, setRecipes } = useContext(Context);

  useEffect(() => {
    const getCategorys = async () => {
      if (recipeType === 'meals') {
        const response = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const responseCategorys = [...response.meals];
        setCategorys(responseCategorys);
      }
      if (recipeType === 'Drinks') {
        const response = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const responseCategorys = [...response.drinks];
        setCategorys(responseCategorys);
      }
    };
    getCategorys();
  }, [recipeType, setIsLoading]);

  const handleClick = async ({ target: { id } }) => {
    if (id === 'All' || id === currentFilter) {
      setCurrentFilter('All');
      const url = recipeType === 'meals'
        ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetchAPIs(url);
      const responseRecipes = [...Object.values(data)[0]];
      setRecipes(responseRecipes);
    }
    if (id !== 'All' && id !== currentFilter) {
      setCurrentFilter(id);
      const url = recipeType === 'meals'
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
      const data = await fetchAPIs(url);
      const responseRecipes = [...Object.values(data)[0]];
      setRecipes(responseRecipes);
    }
  };

  return (
    <section className="btn-filters-container">
      <button
        className="all-btn"
        type="button"
        id="All"
        onClick={ handleClick }
        data-testid="All-category-filter"
      >
        All

      </button>
      {
        categorys.slice(0, numberFilters).map(({ strCategory }, index) => (
          <button
            className="filter-btn"
            key={ index }
            type="button"
            id={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ handleClick }
          >
            { strCategory }
          </button>
        ))
      }
    </section>
  );
}
//

ButtonFilters.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

export default ButtonFilters;
