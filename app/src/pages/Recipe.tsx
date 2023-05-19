import { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext'

const Recipe = () => {
  const { recipeId } = useParams()
  const { data } = useContext(DataContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!data || !recipeId || !data.hasOwnProperty(recipeId)) {
      navigate('/my-recipes/recipes')
    }
  })

  return (
    <>
      {data && recipeId && data.hasOwnProperty(recipeId) && (
        <div className="mt-4 bg-white rounded-lg ">
          <div className="relative flex items-center justify-center h-32 overflow-hidden rounded-t-lg lg:h-64">
            <div className="absolute z-10 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <div className="text-2xl font-bold text-white md:text-4xl font-rochaline">
                {data[recipeId].title}
              </div>
              <div className="text-lg text-white md:text-2xl font-rochaline">
                {data[recipeId].subtitle}
              </div>
            </div>
            <img
              className="z-0 w-full h-auto brightness-50"
              src={data[recipeId].image}
              alt="recipe"
            />
          </div>
          <div className="p-4">
            <div className="mb-4 text-2xl font-semibold">Ingredients</div>
            <ul className="ml-5 list-disc">
              {data[recipeId].ingredients.map((ingredient, index) => {
                return (
                  <li className="mb-1" key={`${ingredient.id}_${index}`}>
                    {ingredient.value}
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 mb-4 text-2xl font-semibold">Directions</div>
            <div>
              {data[recipeId].instructions.map((instruction, index) => {
                return (
                  <div className="mb-3" key={`${instruction.id}_${index}`}>
                    <div className="font-medium">Step {index}</div>
                    {instruction.value}
                  </div>
                )
              })}
            </div>
            <div className="mt-6 mb-4 text-2xl font-semibold">Comments</div>
            <div>{data[recipeId].comments}</div>
          </div>
        </div>
      )}
    </>
  )
}

export default Recipe
