import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import fetchAPIs from '../services/fetchAPI';
import Context from '../context/Context';
import ButtonFilters from '../components/ButtonFilters';
import Header from '../components/Header';

const recipeInitialNumbers = 12;

function Recipes({ history: { location: { pathname } } }) {
  const [recipeType, setRecipeType] = useState('');

  const { recipes, setRecipes, isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    const setInitalRecipes = async () => {
      if (pathname === '/meals') {
        setRecipeType('Meals');
        const data = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const responseRecipes = [...Object.values(data)[0]];
        setRecipes(responseRecipes);
      }
      if (pathname === '/drinks') {
        setRecipeType('Drinks');
        const data = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const responseRecipes = [...Object.values(data)[0]];
        setRecipes(responseRecipes);
      }
    };
    setInitalRecipes();
  }, [pathname, setRecipes, setIsLoading]);

  return (
    <main>
      <Header />
      <section>
        <ButtonFilters recipeType={ recipeType } />
        {
          !isLoading ? recipes.slice(0, recipeInitialNumbers).map((recipe, index) => (
            <RecipeCard
              key={ index }
              linkTestId={ `${index}-recipe-card` }
              nameTestId={ `${index}-card-name` }
              index={ index }
              recipeId={ recipeType === 'Meals' ? recipe.idMeal : recipe.idDrink }
              recipeImage={ recipeType === 'Meals'
                ? recipe.strMealThumb : recipe.strDrinkThumb }
              recipeName={ recipeType === 'Meals' ? recipe.strMeal : recipe.strDrink }
              recipeType={ recipeType }
            />
          )) : <h1>Loading...</h1>
        }
      </section>
      <Footer />
    </main>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Recipes;
