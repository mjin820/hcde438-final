import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import EnterIngredients from './Components/EnterIngredients';
import RecipeList from './Components/RecipeList';
import RecipeInfo from './Components/RecipeInfo';
import SavedRecipes from './Components/SavedRecipes';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<EnterIngredients />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeInfo />} />
            <Route path="/saved-recipes" element={<SavedRecipes />} /> {}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
