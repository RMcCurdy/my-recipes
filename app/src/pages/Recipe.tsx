import { useParams } from 'react-router-dom'

const Recipe = () => {
  const { recipeId } = useParams()
  return <div>Yo we got a recipe {recipeId}</div>
}

export default Recipe
