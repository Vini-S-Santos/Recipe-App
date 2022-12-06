import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/Ingredients.css';

function IngredientsRecipe({ detailedRecipe, isStarted, recipeType, Id, setIsDisabled }) {
  const [ingredients, setIngredients] = useState([]);
  const [progressType, setProgressType] = useState('');
  const [progressRecipe, setProgressRecipe] = useState([]);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: {},
        meals: {},
      }));
    }

    if (recipeType === 'meals') {
      setProgressType('meals');
      const recipesInProgress = Object
        .entries(JSON.parse(localStorage.getItem('inProgressRecipes')).meals);
      const progress = recipesInProgress
        .filter((recipeInProgress) => recipeInProgress[0] === Id)
        .map((recipeIngredients) => recipeIngredients[1]);
      setProgressRecipe(progress[0] ? [...progress[0]] : []);
    } else if (recipeType === 'drinks') {
      setProgressType('drinks');
      const recipesInProgress = Object
        .entries(JSON.parse(localStorage.getItem('inProgressRecipes')).drinks);
      const progress = recipesInProgress
        .filter((recipeInProgress) => recipeInProgress[0] === Id)
        .map((recipeIngredients) => recipeIngredients[1]);
      setProgressRecipe(progress[0] ? [...progress[0]] : []);
    }

    const ingredientsList = Object.entries(detailedRecipe)
      .filter((recipeInfo) => recipeInfo[0].includes('Ingredient') && recipeInfo[1]);

    const ingredientsMeasure = Object.entries(detailedRecipe)
      .filter((recipeInfo) => recipeInfo[0]
        .includes('Measure') && (recipeInfo[1] && recipeInfo[1] !== ' '))
      .map((ingredient) => ingredient[1]);

    ingredientsMeasure.forEach((ingredient, index) => {
      ingredientsList[index].splice(0, 1, ingredient);
    });
    setIngredients(ingredientsList);
  }, [setIngredients, detailedRecipe, recipeType, Id]);

  const saveProgress = (name, operation) => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...recipesInProgress,
      [progressType]: {
        ...recipesInProgress[progressType],
        [Id]: operation === 'save'
          ? [...recipesInProgress[progressType][Id], name]
          : [...recipesInProgress[progressType][Id]
            .filter((ingredient) => ingredient !== name)],
      },
    }));
    const updatedRecipesInProgress = Object
      .entries(JSON.parse(localStorage.getItem('inProgressRecipes'))[progressType]);
    const progress = updatedRecipesInProgress
      .filter((recipeInProgress) => recipeInProgress[0] === Id)
      .map((recipeIngredients) => recipeIngredients[1]);
    setProgressRecipe([...progress[0]]);
  };

  const handleChange = ({ target }) => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!recipesInProgress[progressType][Id]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...recipesInProgress,
        [progressType]: {
          ...recipesInProgress[progressType],
          [Id]: [],
        },
      }));
    }
    if (target.checked) {
      saveProgress(target.name, 'save');
    } else {
      saveProgress(target.name, 'delete');
      target.parentElement.style.textDecoration = 'none';
    }
  };

  useEffect(() => {
    document.querySelectorAll('.selected').forEach((element) => {
      element.parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    });

    if (progressRecipe.length === ingredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [progressRecipe, setIsDisabled, ingredients]);

  return (
    <section>
      <h4>Ingredients</h4>

      {
        isStarted ? ingredients.map((ingredient, index) => (
          <label
            className="ch"
            key={ ingredient }
            htmlFor={ `${index}-ingredient` }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ `${index}-ingredient` }
              onChange={ handleChange }
              name={ index }
              checked={ progressRecipe
                .some((ingredientNumber) => ingredientNumber === index.toString()) }
              className={ progressRecipe
                .some((ingredientNumber) => ingredientNumber === index.toString())
                ? 'selected' : null }
            />

            { `${ingredient[1]}: ${ingredient[0]}` }

          </label>
        )) : (
          <ul>
            {
              ingredients.map((ingredient, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ ingredient }
                >
                  { `${ingredient[1]}: ${ingredient[0]}` }

                </li>
              ))
            }
          </ul>
        )
      }

    </section>
  );
}

IngredientsRecipe.propTypes = {
  detailedRecipe: PropTypes.objectOf(PropTypes.string).isRequired,
  isStarted: PropTypes.bool.isRequired,
  Id: PropTypes.string,
  recipeType: PropTypes.string,
  setIsDisabled: PropTypes.func,
}.isRequired;

IngredientsRecipe.defaultProps = {
  setIsDisabled: () => {},
  recipeId: '',
  recipeType: '',
};

export default IngredientsRecipe;
