import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Ingredients from '../components/Ingredients';
import fetchAPIs from '../services/fetchAPI';
import Youtube from '../components/Youtube';
import RecipeCard from '../components/RecipeCard';

const recomendationRecipeNumber = 6;

function RecipeDetails({ history: { location: { pathname } } }) {
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('/meals')) {
        setRecipeType('Meals');
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recomendation = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecomendations([...recomendation.drinks]);
        setDetailedRecipe(returnedRecipe.meals[0]);
      } else if (pathname.includes('/drinks')) {
        setRecipeType('Drinks');
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recomendation = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecomendations([...recomendation.meals]);
        setDetailedRecipe(returnedRecipe.drinks[0]);
      }
    };
    idFetch();
  }, [pathname, id]);

  console.log(detailedRecipe);

  return (
    <div>
      <img
        src={ recipeType === 'Meals'
          ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb }
        alt="recipe ilustration"
        data-testid="recipe-photo"
      />

      <h3 data-testid="recipe-title">
        {recipeType === 'Meals'
          ? detailedRecipe.strMeal : detailedRecipe.strDrink}
      </h3>
      <p data-testid="recipe-category">
        {recipeType === 'Meals'
          ? detailedRecipe.strCategory : detailedRecipe.strAlcoholic}
      </p>
      <Ingredients
        recipeType={ recipeType }
        detailedRecipe={ detailedRecipe }
        id={ id }
      />
      <p data-testid="instructions">{detailedRecipe.strInstructions}</p>
      {
        (recipeType === 'Meals') && (
          <Youtube
            detailedRecipe={ detailedRecipe }
          />
        )
      }
      <div>
        { recomendations.map((recipe, index) => {
          if (index < recomendationRecipeNumber) {
            return (
              <RecipeCard
                key={ recipeType === 'Meals' ? recipe.idDrink : recipe.idMeal }
                linkTestId={ `${index}-recomendation-card` }
                nameTestId={ `${index}-recomendation-title` }
                index={ index }
                recipeId={ recipeType === 'Meals' ? recipe.idDrink : recipe.idMeal }
                recipeImage={ recipeType === 'Meals'
                  ? recipe.strDrinkThumb : recipe.strMealThumb }
                recipeName={ recipeType === 'Meals' ? recipe.strDrink : recipe.strMeal }
                recipeType={ recipeType }
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeDetails;
