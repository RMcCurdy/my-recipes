import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import Recipe from '../pages/Recipe'
import Header from '../pages/Header'
import Calculator from '../pages/Calculator'

export default function MyRecipeRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/my-recipes" element={<Home />} />
        <Route path="/my-recipes/recipes" element={<Recipes />} />
        <Route path="/my-recipes/recipe/:recipeId" element={<Recipe />} />
        <Route path="/my-recipes/calculator" element={<Calculator />} />
      </Routes>
    </BrowserRouter>
  )
}
