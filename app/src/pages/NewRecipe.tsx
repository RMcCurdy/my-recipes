import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

type NewRecipeType = {
  title: null | string
  subtitle: null | string
  ingredients: { id: number; value: string }[]
  instructions: { id: number; value: string }[]
  image: null | string
  url: null | string
  comments: null | string
}

const NewRecipe = () => {
  const navigate = useNavigate()

  const [values, setValues] = useState<NewRecipeType>({
    title: null,
    subtitle: null,
    ingredients: [{ id: 1, value: '' }],
    instructions: [{ id: 1, value: '' }],
    image: null,
    url: null,
    comments: null,
  })

  const [imageUpload, setImageUpload] = useState<File | null>(null)

  const removeItem = <T extends { id: number; value: string }>(
    array: T[],
    property: keyof T,
    value: T[keyof T]
  ): T[] => {
    return array.filter((item) => item[property] !== value)
  }

  function handleAddNewRecipe() {
    if (values.title && imageUpload && values.url) {
      const today = new Date()
      const month = today.getMonth() + 1 // JavaScript counts months from 0, so add 1
      const day = today.getDate()
      const year = today.getFullYear()
      const database = getDatabase()
      const dbRef = ref(
        database,
        `recipes/${values.title.replace(/\s/g, '')}${month}${day}${year}`
      )
      const storage = getStorage()
      const imageRef = storageRef(storage, `images/${imageUpload.name}`)

      // 'file' comes from the Blob or File API
      uploadBytes(imageRef, imageUpload)
      // Set data at the location
      set(dbRef, {
        id: `${values.title.replace(/\s/g, '')}${month}${day}${year}`,
        title: values.title,
        subtitle: values.subtitle,
        ingredients: values.ingredients,
        instructions: values.instructions,
        image: imageUpload.name,
        url: values.url,
        comments: values.comments,
      }).then(() => {
        navigate('/my-recipes/recipes')
      })
    }
  }

  const handleUploadedFiles = (e: any) => {
    if (e.target.files[0]) {
      setImageUpload(e.target.files[0])
    }
  }

  const handleAddIngredientInput = () => {
    const newId = values.ingredients.length + 1
    const newInputs = [...values.ingredients, { id: newId, value: '' }]
    setValues({ ...values, ingredients: newInputs })
  }

  const handleIngredientInputChange = (event: any, id: number) => {
    const updatedInputs = values.ingredients.map((input) => {
      if (input.id === id) {
        return { id, value: event.target.value }
      } else {
        return input
      }
    })
    setValues({ ...values, ingredients: updatedInputs })
  }

  const handleAddInstructionsInput = () => {
    const newId = values.instructions.length + 1
    const newInputs = [...values.instructions, { id: newId, value: '' }]
    setValues({ ...values, instructions: newInputs })
  }

  const handleInstructionsInputChange = (event: any, id: number) => {
    const updatedInputs = values.instructions.map((input) => {
      if (input.id === id) {
        return { id, value: event.target.value }
      } else {
        return input
      }
    })
    setValues({ ...values, instructions: updatedInputs })
  }

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = removeItem(values.ingredients, 'id', index)
    setValues({ ...values, ingredients: newIngredients })
  }

  const handleRemoveInstruction = (index: number) => {
    const newInstructions = removeItem(values.instructions, 'id', index)
    setValues({ ...values, instructions: newInstructions })
  }

  return (
    <div className="p-4 mt-4 bg-white rounded-lg">
      <div className="mb-4 text-4xl font-semibold font-rochaline">
        New Recipe
      </div>
      <div>
        <div className="mb-3 text-lg">Title</div>
        <input
          className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(event) =>
            setValues({ ...values, title: event.target.value })
          }
        />
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div>
        <div className="mb-3 text-lg">Subtitle</div>
        <input
          className="w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(event) =>
            setValues({ ...values, subtitle: event.target.value })
          }
        />
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div>
        <div className="mb-3 text-lg">Ingredients</div>
        <div>
          {values.ingredients.map((input) => (
            <div className="flex items-center">
              <input
                className="w-full p-2 mb-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                key={input.id}
                value={input.value}
                onChange={(event) =>
                  handleIngredientInputChange(event, input.id)
                }
              />
              <div
                onClick={() => handleRemoveIngredient(input.id)}
                className="mb-3 ml-3 text-red-600 hover:cursor-pointer"
              >
                X
              </div>
            </div>
          ))}
        </div>
        <button
          className="px-3 py-2 bg-green-300 rounded"
          onClick={handleAddIngredientInput}
        >
          Add Ingredient
        </button>
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div>
        <div className="mb-3 text-lg">Directions</div>
        {values.instructions.map((input, index) => (
          <>
            <div className="mb-1">Step {index + 1}</div>
            <div className="flex items-center">
              <input
                className="w-full p-2 mb-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                key={input.id}
                value={input.value}
                onChange={(event) =>
                  handleInstructionsInputChange(event, input.id)
                }
              />
              <div
                onClick={() => handleRemoveInstruction(input.id)}
                className="mb-3 ml-3 text-red-600 hover:cursor-pointer"
              >
                X
              </div>
            </div>
          </>
        ))}
        <button
          className="px-3 py-2 bg-green-300 rounded"
          onClick={handleAddInstructionsInput}
        >
          Add Direction
        </button>
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div>
        <div className="mb-3 text-lg">Image</div>
        <button>
          <input
            type="file"
            name="files"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleUploadedFiles}
          />
        </button>
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div>
        <div className="mb-3 text-lg">URL</div>
        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(event) =>
            setValues({ ...values, url: event.target.value })
          }
        />
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div>
        Comments
        <input
          className="w-full p-2 mb-3 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(event) =>
            setValues({ ...values, comments: event.target.value })
          }
        />
      </div>
      <hr className="mt-5 mb-3 border-green-200" />
      <div className="mt-8">
        <button
          className="px-3 py-2 bg-green-300 rounded"
          onClick={() => handleAddNewRecipe()}
        >
          Add New Recipe
        </button>
      </div>
    </div>
  )
}

export default NewRecipe
