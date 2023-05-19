import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

type RecipesProps = {
  key: string
  image: string
  title: string
  subtitle: string | null
  id: string
}

const RecipePreview = (props: RecipesProps) => {
  const { key, image, title, subtitle, id } = props
  const navigate = useNavigate()

  function handleClick(userId: string) {
    navigate(`/my-recipes/recipe/${userId}`)
  }

  const [imageFromStorage, setImageFromStorage] = useState<string | null>(null)

  useEffect(() => {
    const storage = getStorage()
    const imageRef = storageRef(storage, `images/${image}`)
    getDownloadURL(imageRef)
      .then((url) => {
        setImageFromStorage(url)
      })
      .catch(() => {
        console.log('ERROR')
      })
  })

  return (
    <div key={key} className="bg-white rounded-lg">
      <div className="h-32 overflow-x-auto">
        {imageFromStorage && (
          <img
            className="object-cover w-full h-full"
            src={imageFromStorage}
            alt="recipe"
          />
        )}
      </div>
      {/* <div className="flex items-center justify-center h-32 overflow-hidden rounded-t-lg lg:h-64">
        {imageFromStorage && (
          <img className="w-full h-auto" src={imageFromStorage} alt="recipe" />
        )}
      </div> */}
      <div className="p-3">
        <div className="text-lg font-coolvetica lg:text-2xl">{title}</div>
        <div>{subtitle}</div>
        <button
          onClick={() => handleClick(id)}
          className="px-3 py-2 mt-2 bg-green-300 rounded"
        >
          Go to Recipe
        </button>
      </div>
    </div>
  )
}

export default RecipePreview
