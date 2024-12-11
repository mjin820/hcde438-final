import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeCard.css';

function RecipeCard({ recipe, userIngredients }) {
  const navigate = useNavigate();

  const handleViewRecipe = () => {
    navigate(`/recipes/${recipe.id}`, { state: { recipeId: recipe.id, userIngredients } });
  };

  return (
    <div className="recipe-card">
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      <h2>{recipe.title}</h2>
      <button className="btn btn-primary mt-2" onClick={handleViewRecipe}>
        View Recipe
      </button>
    </div>
  );
}

export default RecipeCard;
