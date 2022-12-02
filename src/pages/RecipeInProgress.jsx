import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import fetchAPIs from '../services/fetchAPI';
import Ingredients from '../components/Ingredients';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Context from '../context/Context';

const magicNumber = -1;

function RecipeInProgress({ history: { location: { pathname }, push } }) {
  const [detailedRecipe, setDetailedRecipe] = useState({});
  const [recipeType, setRecipeType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams(); // hook usado para pegar parametros passados via url;

  const { isStarted, setIsStarted } = useContext(Context);

  useEffect(() => {
    setIsStarted(true);
  }, []);

  useEffect(() => {
    const idFetch = async () => {
      if (pathname.includes('/meals')) {
        setRecipeType('meals');
        const returnedRecipe = await fetchAPIs(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetailedRecipe(returnedRecipe.meals[0]);
        setIsLoading(false);
      }
      if (pathname.includes('/drinks')) {
        setRecipeType('drinks');
        const returnedRecipe = await fetchAPIs(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        setDetailedRecipe(returnedRecipe.drinks[0]);
        setIsLoading(false);
      }
    };
    idFetch();
  }, [pathname, id, setIsStarted]);

  const handleFinishRecipe = () => {
    if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    const date = new Date();
    const currentDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    const finishedRecipe = {
      id: recipeType === 'meals' ? detailedRecipe.idMeal : detailedRecipe.idDrink,
      type: recipeType.slice(0, magicNumber),
      nationality: recipeType === 'meals' ? detailedRecipe.strArea : '',
      category: detailedRecipe.strCategory,
      alcoholicOrNot: recipeType === 'meals' ? '' : detailedRecipe.strAlcoholic,
      name: recipeType === 'meals' ? detailedRecipe.strMeal : detailedRecipe.strDrink,
      image: recipeType === 'meals'
        ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb,
      doneDate: date,
      tags: recipeType === 'meals' ? detailedRecipe.strTags.split(',') : [],
    };

    localStorage
      .setItem('doneRecipes', JSON.stringify([...currentDoneRecipes, finishedRecipe]));

    push('/done-recipes');
  };

  const { strInstructions } = detailedRecipe;
  return (
    <main>
      {
        !isLoading && (
          <div>
            <header>
              <img
                src={ recipeType === 'meals'
                  ? detailedRecipe.strMealThumb : detailedRecipe.strDrinkThumb }
                alt="recipe ilustration"
                data-testid="recipe-photo"
              />
              <h2 data-testid="recipe-title">
                { recipeType === 'meals'
                  ? detailedRecipe.strMeal : detailedRecipe.strDrink }
              </h2>
              <div>
                <h5 data-testid="recipe-category">
                  Caregory:
                  { recipeType === 'meals'
                    ? ` ${detailedRecipe.strCategory}`
                    : ` ${detailedRecipe.strAlcoholic}` }
                </h5>
                <div>
                  <ShareButton pathname={ pathname } />
                  <FavoriteButton
                    recipeId={ id }
                    recipe={ detailedRecipe }
                    recipeType={ recipeType }
                    pathname={ pathname }
                  />
                </div>
              </div>
            </header>
            <Ingredients
              recipeType={ recipeType }
              detailedRecipe={ detailedRecipe }
              isStarted={ isStarted }
              Id={ id }
              setIsDisabled={ setIsDisabled }
            />
            <section>
              <p
                data-testid="instructions"
              >
                { strInstructions }
              </p>
            </section>
            <div>
              <button
                type="button"
                data-testid="finish-recipe-btn"
                disabled={ isDisabled }
                onClick={ handleFinishRecipe }
              >
                Finish Recipe
              </button>
            </div>
          </div>
        )
      }
    </main>
  );
}
RecipeInProgress.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default RecipeInProgress;
