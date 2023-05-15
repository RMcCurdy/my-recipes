import { useState } from 'react'
import { getDatabase, ref, set } from 'firebase/database'

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
  const [values, setValues] = useState<NewRecipeType>({
    title: null,
    subtitle: null,
    ingredients: [{ id: 1, value: '' }],
    instructions: [{ id: 1, value: '' }],
    image: null,
    url: null,
    comments: null,
  })

  const [imageUpload, setImageUpload] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string>('')

  function handleAddNewRecipe() {
    console.log(values)
    console.log(imageUpload)
    console.log(imagePreview)
    const today = new Date()
    const month = today.getMonth() + 1 // JavaScript counts months from 0, so add 1
    const day = today.getDate()
    const year = today.getFullYear()
    const database = getDatabase()
    const dbRef = ref(database, `recipes/shrimpRiceWraps${month}${day}${year}`)
    // Set data at the location
    if (values.title && values.image) {
      set(dbRef, {
        id: `${values.title.replace(/\s/g, '')}${month}${day}${year}`,
        title: values.title,
        subtitle: values.subtitle,
        ingredients: values.ingredients,
        instructions: values.instructions,
        image: values.image,
        url: values.url,
        comments: values.comments,
      })
    }
  }

  const handleUploadedFiles = (e: any) => {
    if (e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]))
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

  return (
    <div>
      <div>New Recipe time</div>
      <div>
        Title
        <input
          type="text"
          onChange={(event) =>
            setValues({ ...values, title: event.target.value })
          }
        />
      </div>
      <div>
        Subtitle
        <input
          type="text"
          onChange={(event) =>
            setValues({ ...values, subtitle: event.target.value })
          }
        />
      </div>
      <div>
        Ingredients
        {values.ingredients.map((input) => (
          <input
            key={input.id}
            value={input.value}
            onChange={(event) => handleIngredientInputChange(event, input.id)}
          />
        ))}
        <button onClick={handleAddIngredientInput}>Add Input</button>
      </div>
      <div>
        Instructions
        {values.instructions.map((input) => (
          <input
            key={input.id}
            value={input.value}
            onChange={(event) => handleInstructionsInputChange(event, input.id)}
          />
        ))}
        <button onClick={handleAddInstructionsInput}>Add Input</button>
      </div>
      <div>
        Image
        <button>
          <input
            type="file"
            name="files"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleUploadedFiles}
          />
        </button>
      </div>
      <div>
        URL
        <input
          type="text"
          onChange={(event) =>
            setValues({ ...values, url: event.target.value })
          }
        />
      </div>
      <div>
        Comments
        <input
          type="text"
          onChange={(event) =>
            setValues({ ...values, comments: event.target.value })
          }
        />
      </div>
      <button
        className="bg-green-300 px-3 py-2 rounded"
        onClick={() => handleAddNewRecipe()}
      >
        Add
      </button>
    </div>
  )
}

export default NewRecipe
