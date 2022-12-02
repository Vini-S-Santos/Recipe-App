import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Ingredients from '../components/Ingredients';
import fetchAPIs from '../services/fetchAPI';
import RecipeCard from '../components/RecipeCard';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import Context from '../context/Context';
import styles from './styles/RecipeDetails.module.css';

const recomendationRecipeNumber = 6;

function RecipeDetails({ history: { location: { pathname }, push } }) {
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const [recomendations, setRecomendations] = useState([]);
  const [recipeType, setRecipeType] = useState('');
  const [isFinishedRecipe, setIsFinishedRecipe] = useState(false);
  const { id } = useParams();
  const {
    isStarted,
    setIsStarted,
    isInProgress,
    setIsInProgress,
  } = useContext(Context);

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('/meals')) {
        setRecipeType('meals');
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recomendation = await fetchAPIs('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        setRecomendations([...recomendation.drinks]);
        setDetailedRecipe(returnedRecipe.meals[0]);
      } else if (pathname.includes('/drinks')) {
        setRecipeType('drinks');
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const recomendation = await fetchAPIs('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        setRecomendations([...recomendation.meals]);
        setDetailedRecipe(returnedRecipe.drinks[0]);
      }
    };
    idFetch();
  }, [pathname, id]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (doneRecipes.some(({ id: doneId }) => id === doneId)) {
      setIsFinishedRecipe(true);
    }
    if (recipeType === 'meals' && inProgressRecipes.meals) {
      const inProgressIds = Object.keys(inProgressRecipes.meals);
      setIsInProgress(inProgressIds.some((inProgressId) => inProgressId === id));
    }
    if (recipeType === 'drinks' && inProgressRecipes.drinks) {
      const inProgressIds = Object.keys(inProgressRecipes.drinks);
      const inProgress = inProgressIds.some((inProgressId) => inProgressId === id);
      setIsInProgress(inProgress);
    }
  }, [id, recipeType, setIsInProgress]);

  const handleClick = () => {
    push(`/${recipeType}/${id}/in-progress`);
    setIsStarted(true);
  };

  return (
    <div>
      <img
        src={ recipeType === 'meals'
          ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb }
        alt="recipe ilustration"
        data-testid="recipe-photo"
      />

      <h3 data-testid="recipe-title">
        {recipeType === 'meals'
          ? detailedRecipe.strMeal : detailedRecipe.strDrink}
      </h3>
      <p data-testid="recipe-category">
        {recipeType === 'meals'
          ? detailedRecipe.strCategory : detailedRecipe.strAlcoholic}
      </p>
      <div>
        <ShareButton pathname={ pathname } />
        <FavoriteButton
          recipeId={ id }
          recipe={ detailedRecipe }
          recipeType={ recipeType }
          pathname={ pathname }
        />
      </div>
      {
        !isFinishedRecipe && (
          <div>
            <button
              className={ styles.startRecipeButton }
              type="button"
              data-testid="start-recipe-btn"
              onClick={ handleClick }
            >
              {
                isInProgress ? 'Continue Recipe' : 'START RECIPE'
              }
            </button>
          </div>
        )
      }
      <Ingredients
        recipeType={ recipeType }
        detailedRecipe={ detailedRecipe }
        id={ id }
        isStarted={ isStarted }
      />
      <p data-testid="instructions">{detailedRecipe.strInstructions}</p>
      {
        detailedRecipe.strYoutube
        && <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ `${detailedRecipe.strYoutube.replace('watch?v=', 'embed/')}` }
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      }
      <div className={ styles.recomentationsContainer }>
        { recomendations.map((recipe, index) => {
          if (index < recomendationRecipeNumber) {
            return (
              <RecipeCard
                key={ recipeType === 'meals' ? recipe.idDrink : recipe.idMeal }
                linkTestId={ `${index}-recommendation-card` }
                nameTestId={ `${index}-recommendation-title` }
                index={ index }
                recipeId={ recipeType === 'meals' ? recipe.idDrink : recipe.idMeal }
                recipeImage={ recipeType === 'meals'
                  ? recipe.strDrinkThumb : recipe.strMealThumb }
                recipeName={ recipeType === 'meals' ? recipe.strDrink : recipe.strMeal }
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
