import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { getDatabase, ref, get } from 'firebase/database'
import firebase from 'firebase/compat/app'

type RecipeType = {
  id: string
  title: string
  subtitle: string
  ingredients: string[]
  instructions: string[]
  image: string
}

const Recipe = () => {
  const { recipeId } = useParams()

  const [data, setData] = useState<RecipeType | null>(null)

  const firebaseInitializedRef = useRef(false)

  useEffect(() => {
    if (firebase.apps.length) firebaseInitializedRef.current = true
  }, [])

  useEffect(() => {
    if (firebaseInitializedRef.current) {
      const database = getDatabase()
      const dbRef = ref(database, `recipes/${recipeId}`)
      get(dbRef).then((snapshot) => {
        setData(snapshot.val())
      })
    }
  }, [firebaseInitializedRef, recipeId])

  return (
    <>
      {data && (
        <div>
          Yo we got a recipe {data?.id} {data?.title} {data?.subtitle}
        </div>
      )}
    </>
  )
}

export default Recipe
