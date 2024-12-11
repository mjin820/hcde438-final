import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import RecipeCard from './RecipeCard';

function SavedRecipes() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedRecipes() {
      try {
        const querySnapshot = await getDocs(collection(db, 'savedRecipes'));
        const recipes = querySnapshot.docs.map((doc) => doc.data());
        setSavedRecipes(recipes);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  return (
    <div className="saved-recipes">
      <h1>Saved Recipes</h1>
      {loading ? (
        <p>Loading saved recipes...</p>
      ) : savedRecipes.length > 0 ? (
        <div className="recipes">
          {savedRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p>No saved recipes found.</p>
      )}
    </div>
  );
}

export default SavedRecipes;
