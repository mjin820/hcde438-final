import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EnterIngredients.css';

function EnterIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const addIngredient = () => {
    if (input) {
      setIngredients([...ingredients, input]);
      setInput('');
    }
  };

  const removeIngredient = (indexToRemove) => {
    const updatedIngredients = ingredients.filter((_, index) => index !== indexToRemove);
    setIngredients(updatedIngredients);
  };

  const generateRecipesHandle = () => {
    navigate('/recipes', { state: { ingredients } });
  };

  return (
    <div className="enter-ingredients-container">
      <h1>Welcome to FlavorFusion</h1>
      <p>Enter the ingredients you have at home, and let us inspire your next meal!</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addIngredient();
        }}
        className="ingredient-form"
      >
        <input value={input} id="ingredient-input" type="text" onChange={(e) => setInput(e.target.value)}
          placeholder="Enter one ingredient at a time..." className="form-control"
        />
        <button type="submit" className="btn btn-primary">
          Add Ingredient
        </button>
      </form>
      <div className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-tag">
            {ingredient}
            <button
              type="button"
              className="btn btn-link"
              onClick={() => removeIngredient(index)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-success mt-3"
        onClick={generateRecipesHandle}
      >
        Generate Recipes
      </button>
    </div>
  );
}

export default EnterIngredients;
