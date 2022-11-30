import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ detailedRecipe, recipeType, id }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
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
  }, [setIngredients, detailedRecipe, recipeType, id]);

  return (
    <section>
      <h4>Ingredients</h4>
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
    </section>
  );
}

Ingredients.propTypes = {
  detailedRecipe: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
};

export default Ingredients;
