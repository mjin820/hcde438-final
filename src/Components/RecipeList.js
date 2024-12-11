import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SPOONACULAR_API_KEY } from '../keys';
import RecipeCard from './RecipeCard';

function RecipeList() {
  const { state } = useLocation();
  const { ingredients } = state || {};
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      fetchRecipes(ingredients);
    }
  }, [ingredients]);

  const fetchRecipes = async (ingredients) => {
    const query = ingredients.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${SPOONACULAR_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (e) {
      console.e('Error fetching recipes:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-list">
      <h1>Recipe Results</h1>
      {loading ? (
        <p>Loading recipes...</p>
      ) : recipes.length > 0 ? (
        <div className="recipes">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} userIngredients={ingredients} />
          ))}
        </div>
      ) : (
        <p>No recipes found for the given ingredients.</p>
      )}
    </div>
  );
}

export default RecipeList;
