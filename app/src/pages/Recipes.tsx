import { useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDatabase, ref, get } from 'firebase/database'
import firebase from 'firebase/compat/app'
import { DataContext } from '../context/DataContext'
import RecipePreview from './RecipePreview'

const Recipes = () => {
  const navigate = useNavigate()
  const { data, setData } = useContext(DataContext)

  const firebaseInitializedRef = useRef(false)

  useEffect(() => {
    if (firebase.apps.length) firebaseInitializedRef.current = true
  }, [])

  useEffect(() => {
    if (firebaseInitializedRef.current && !data) {
      const database = getDatabase()
      const dbRef = ref(database, `recipes`)
      get(dbRef).then((snapshot) => {
        setData(snapshot.val())
      })
    }
  }, [firebaseInitializedRef, data, setData])

  return (
    <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        onClick={() => navigate('/my-recipes/add')}
        className="flex items-center justify-center py-3 text-center bg-white rounded-lg md:py-8 hover:cursor-pointer"
      >
        <div className="mr-2">New Recipe</div>
        <button className="text-xl">➕</button>
      </div>
      {data ? (
        Object.entries(data).map(([key, value]) => {
          return (
            <RecipePreview
              key={key}
              image={value.image}
              title={value.title}
              subtitle={value.subtitle}
              id={value.id}
            />
          )
        })
      ) : (
        <div>Fetching data...</div>
      )}
    </div>
  )
}

export default Recipes
