export const ingredientSearch = async (ingredient, path) => {
  const diretorio = path === '/meals' ? 'meal' : 'cocktail';
  const key1 = path === '/meals' ? 'meals' : 'drinks';
  const response = await fetch(`https://www.the${diretorio}db.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const data = await response.json();
  if (key1 === 'meals') {
    return data.meals;
  }
  if (key1 === 'drinks') {
    return data.drinks;
  }
};

export const nameSearch = async (name, path) => {
  const diretorio = path === '/meals' ? 'meal' : 'cocktail';
  const key1 = path === '/meals' ? 'meals' : 'drinks';
  const response = await fetch(`https://www.the${diretorio}db.com/api/json/v1/1/search.php?s=${name}`);
  const data = await response.json();
  if (key1 === 'meals') {
    return data.meals;
  }
  if (key1 === 'drinks') {
    return data.drinks;
  }
};
// APAGAR COMENTÁRIO
export const LetraSearch = async (letra, path) => {
  const diretorio = path === '/meals' ? 'meal' : 'cocktail';
  const key1 = path === '/meals' ? 'meals' : 'drinks';
  const response = await fetch(`https://www.the${diretorio}db.com/api/json/v1/1/search.php?f=${letra}`);
  const data = await response.json();
  if (key1 === 'meals') {
    return data.meals;
  }
  if (key1 === 'drinks') {
    return data.drinks;
  }
};
