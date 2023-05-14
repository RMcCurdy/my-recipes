import data from '../data/recipes.json'
import { useNavigate } from 'react-router-dom'

const Recipes = () => {
  const navigate = useNavigate()

  function handleClick(userId: number) {
    navigate(`/recipe/${userId}`)
  }

  return (
    <div className="grid gap-4 py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {data.map((dataPoint) => {
        return (
          <div className="bg-white rounded-lg">
            <div className="rounded-t-lg overflow-hidden h-32 lg:h-64 flex justify-center items-center">
              <img
                className="w-full h-auto"
                src={dataPoint.image}
                alt="recipe"
              />
            </div>
            <div className="p-3">
              <div className="font-coolvetica text-lg lg:text-2xl">
                {dataPoint.title}
              </div>
              <div>{dataPoint.subtitle}</div>
              <button
                onClick={() => handleClick(dataPoint.id)}
                className="bg-green-300 px-3 py-2 rounded mt-2"
              >
                Go to Recipe
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Recipes
