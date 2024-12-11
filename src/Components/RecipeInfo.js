import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { SPOONACULAR_API_KEY } from '../keys';
import { Button, Modal } from 'react-bootstrap';
import './RecipeInfo.css';

function RecipeInfo() {
  const { id } = useParams();
  const { state } = useLocation();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [missingIngredients, setMissingIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const userIngredients = state?.userIngredients || [];

  useEffect(() => {
    if (id) {
      fetchRecipeDetails(id);
    }
  }, [id]);

  const fetchRecipeDetails = async (recipeId) => {
    const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${SPOONACULAR_API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRecipeDetails(data);

      const requiredIngredients = data.extendedIngredients.map((ingredient) =>
        ingredient.name.toLowerCase().trim()
      );
      const userIngredientsLowerCase = userIngredients.map((ingredient) =>
        ingredient.toLowerCase().trim()
      );

      const missing = requiredIngredients.filter(
        (ingredient) => !userIngredientsLowerCase.includes(ingredient)
      );

      setMissingIngredients(missing);
    } catch (e) {
      console.e('Error fetching recipe details:', e);
    } finally {
      setLoading(false);
    }
  };

  async function saveRecipe() {
    if (recipeDetails) {
      try {
        const recipeDoc = doc(db, 'savedRecipes', `${recipeDetails.id}`);
        await setDoc(recipeDoc, {
          id: recipeDetails.id,
          title: recipeDetails.title,
          image: recipeDetails.image,
          instructions: recipeDetails.instructions,
          ingredients: recipeDetails.extendedIngredients.map((ing) => ing.original),
        });
      } catch (e) {
        console.e('Error saving recipe:', e);
      }
    }
  };

  const handleShowModal = () => setShowModal(true); 
  const handleCloseModal = () => setShowModal(false); 

  if (loading) return <p>Loading recipe details...</p>;

  return (
    <div className="recipe-info">
      <h1>{recipeDetails.title}</h1>
      <img
        src={recipeDetails.image}
        alt={recipeDetails.title}
        className="recipe-image"
        style={{ maxWidth: '300px', borderRadius: '8px' }} 
      />
      <h2>Ingredients</h2>
      <ul>
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipeDetails.instructions || 'No instructions available.'}</p>
      <Button variant="success" className="mt-3" onClick={saveRecipe}>
      ❤️ Save Recipe
      </Button>
      <Button variant="info" className="mt-3 ms-2" onClick={handleShowModal}>
      🔍 View Missing Ingredients
      </Button>

      {}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Missing Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {missingIngredients.length > 0 ? (
            <ul>
              {missingIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>You have all the ingredients for this recipe!</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RecipeInfo;
