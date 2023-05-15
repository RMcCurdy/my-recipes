import { useEffect, useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import Recipe from '../pages/Recipe'
import Header from '../pages/Header'
import Calculator from '../pages/Calculator'
import NewRecipe from '../pages/NewRecipe'
import NotFound from '../pages/NotFound'

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { AuthContext } from '../context/AuthContext'

export default function MyRecipeRoutes() {
  const { authenticated } = useContext(AuthContext)

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyAlKOvuYUt5TQRkcLDvJEhxCoQpTubygmM',
    authDomain: 'my-recipes-aa980.firebaseapp.com',
    projectId: 'my-recipes-aa980',
    storageBucket: 'my-recipes-aa980.appspot.com',
    messagingSenderId: '926297647098',
    appId: '1:926297647098:web:1397ad3f16f56fa2266643',
    measurementId: 'G-M9R8K42DPF',
  }

  useEffect(() => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  })

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/my-recipes" element={<Home />} />
        {authenticated && (
          <>
            <Route path="/my-recipes/recipes" element={<Recipes />} />
            <Route path="/my-recipes/recipe/:recipeId" element={<Recipe />} />
            <Route path="/my-recipes/calculator" element={<Calculator />} />
            <Route path="/my-recipes/add" element={<NewRecipe />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
